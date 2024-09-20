import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { OrderRepository } from './order.repository';
import {
  OrderCreateDto,
  OrderUpdateDto,
  OrderEntity,
  UpdateOrderPurchaseDto,
} from 'src/validation/dto/order';
import { PaginationQueryDto, PriceDto } from 'src/validation/dto/shared';
import { OrderStatus, Prisma } from '@prisma/client';
import { StripeService } from 'src/services/payment/stripe.service';
import Stripe from 'stripe';
import { PaypalService } from 'src/services/payment/paypal.service';
import { ProductItemRepository } from '../product-item/product-item.repository';
import { ProductPurchaseItem } from 'src/validation/dto/product-item';
import { CustomizedPaypalPurchaseDto } from 'src/validation/dto/order/order-paypal-purchase.dto';
import { CustomizedStripePurchaseDto } from 'src/validation/dto/order/order-stripe-purchase.dto';
import { MsgType } from '@interfaces/redis-logs.interface';
import { BotService } from '@modules/bot/bot.service';

@Injectable()
export class OrderService {
  constructor(
    private readonly repository: OrderRepository,
    @Inject(StripeService) private readonly stripeService: StripeService,
    @Inject(PaypalService) private readonly paypalService: PaypalService,
    private readonly productItemRepository: ProductItemRepository,
    private readonly botService: BotService,
  ) {}

  private async _calculateTotal(
    products: Array<ProductPurchaseItem>,
  ): Promise<number> {
    let totalAmount = 0;
    for (const product of products) {
      const productPrice = await this.repository.getProductPriceById(
        product.id,
      );
      totalAmount +=
        JSON.parse(productPrice as string).price * product.quantity;
    }
    return totalAmount;
  }

  //TODO: understand the return types (was Promise<OrderEntity>)
  async create(orderData: OrderCreateDto) {
    const order = await this.repository.create(orderData);

    if (order)
      await this.botService.sendOrderChanges(
        `Order #${order.orderNumber} created`,
        orderData.shopId,
      );

    return order;
  }

  //TODO: understand the return types (was Promise<OrderEntity[]>)
  async findAll(paginationQuery: PaginationQueryDto, status?: OrderStatus) {
    return this.repository.findAll(paginationQuery, status);
  }

  //TODO: understand the return types (was Promise<OrderEntity | null>)
  async findById(id: string, status?: OrderStatus) {
    const order = await this.repository.findById(id, status);

    if (!order) throw new NotFoundException('Order not found');

    return order;
  }

  private async handleCancelledOrder(existingOrder) {
    for (const item of existingOrder.items) {
      const productId = item.productItemId;
      const quantity = item.quantity;

      await this.repository.incrementProductStock(productId, quantity);
    }

    await this.repository.deleteOrderItemsByOrderId(existingOrder.id);
  }

  private transformOrderData(orderData: OrderUpdateDto, existingOrder) {
    const { totalPrice, items, ...rest } = orderData;

    const transformedData: Prisma.OrderUpdateInput = {
      ...rest,
      totalPrice: { ...totalPrice },
    };

    if (items) {
      transformedData.items = {
        deleteMany: {},
        create: items.map((item) => ({
          productItem: { connect: { id: item.productItemId } },
          quantity: item.quantity,
          prices: [
            ...item.prices.map((obj) => ({
              price: obj.price,
              currency: obj.currency,
            })),
          ],
          shop: {
            connect: {
              id: existingOrder.shopId,
            },
          },
        })),
      };
    }

    return transformedData;
  }

  private transformOrderEntity(order) {
    return {
      ...order,
      totalPrice: order.totalPrice as unknown as PriceDto[],
      items: order.items.map((item) => ({
        ...item,
        prices: item.prices as unknown as PriceDto,
      })),
    };
  }

  async update(id: string, orderData: OrderUpdateDto) {
    const existingOrder = await this.repository.findById(id);

    if (!existingOrder) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    if (orderData.status === OrderStatus.Cancelled) {
      await this.handleCancelledOrder(existingOrder);
      return this.delete(id, existingOrder.shopId);
    }

    const isChangedStatus = existingOrder.status !== orderData.status;

    const transformedData = this.transformOrderData(orderData, existingOrder);
    const updatedOrder = await this.repository.update(id, transformedData);

    if (updatedOrder.status === OrderStatus.Paid) {
      await this.repository.logToRedis({
        shopId: updatedOrder.shopId,
        message: `${updatedOrder.customerId} paid for an order ${updatedOrder.id}`,
        msgType: MsgType.INFO,
        customerId: updatedOrder.customerId,
        orderId: id,
        orderStatus: updatedOrder.status,
      });
    }

    if (isChangedStatus)
      await this.botService.sendOrderChanges(
        `Order status #${updatedOrder.orderNumber} changed: ${updatedOrder.status}`,
        updatedOrder.shopId,
      );

    if (isChangedStatus && orderData.status === OrderStatus.Paid)
      await this.botService.sendConfirmOrderMessage(
        updatedOrder.customerId,
        updatedOrder.shopId,
      );

    return this.transformOrderEntity(updatedOrder);
  }

  async delete(id: string, shopId: string) {
    this.repository.logToRedis({
      shopId,
      message: `Order with ID${id} canceled`,
      msgType: MsgType.WARNING,
      orderId: id,
    });
    const order = await this.repository.delete(id);

    await this.botService.sendOrderChanges(
      `Order #${order.orderNumber} canceled`,
      shopId,
    );

    return;
  }

  async validateOrder(id: string, currency: string) {
    const validationResult = await this.repository.validateOrderItems(
      id,
      currency,
    );

    if (!validationResult.isValid)
      throw new BadRequestException({
        message:
          'One or more items in the order are not available in stock or currency is invalid.',
        details: validationResult.details,
      });
  }

  async purchaseItemsWithStripe(
    purchaseDto: CustomizedStripePurchaseDto,
  ): Promise<Stripe.PaymentIntent> {
    const totalAmount = await this._calculateTotal(purchaseDto.products);

    const amountInCents = totalAmount * 100;

    const paymentIntent = await this.stripeService.createPaymentIntent(
      amountInCents,
      purchaseDto.currency,
      purchaseDto.payment_method,
    );

    return paymentIntent;
  }

  async purchaseItemsWithPaypal(purchaseDto: CustomizedPaypalPurchaseDto) {
    const totalAmount = await this._calculateTotal(purchaseDto.products);
    const order = await this.paypalService.createOrder(
      totalAmount,
      purchaseDto.purchase_units[0].amount.currency_code,
    );

    return order;
  }

  async findByCustomerTelegramID(telegramID: string): Promise<OrderEntity[]> {
    return this.repository.findByCustomerTelegramID(telegramID);
  }

  async findSingleOrderByCustomerTelegramID(
    telegramID: string,
    orderId: string,
  ) {
    const order = await this.repository.findSingleOrderByCustomerTelegramID(
      telegramID,
      orderId,
    );

    if (!order) throw new NotFoundException('Order not found');

    return order;
  }

  async applyPromoCode(
    orderId: string,
    promoCode: string,
  ): Promise<OrderEntity> {
    return this.repository.applyPromoCode(orderId, promoCode);
  }

  async updateOrderAfterPayment(
    updateDto: UpdateOrderPurchaseDto,
  ): Promise<OrderEntity> {
    const { orderId, email, address, payment, items } = updateDto;

    for (const item of items) {
      await this.productItemRepository.decreaseProductStock(
        item.productItemId,
        item.quantity,
      );
    }

    return this.repository.updateOrderAfterPayment({
      orderId,
      email,
      address,
      payment,
      status: OrderStatus.Paid,
    });
  }
}
