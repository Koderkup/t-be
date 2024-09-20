import { IRedisLog, MsgType } from '@interfaces/redis-logs.interface';
import { RedisService } from '@modules/redis/redis.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AppConfiguration, Order, OrderStatus, Prisma } from '@prisma/client';
import { JsonValue } from '@prisma/client/runtime/library';
import { ONE_WEEK_IN_SECOND } from '@root/constants/uploader.constant';
import { convertJsonToPriceDto } from 'src/helpers/convert';
import { PrismaService } from 'src/services/prisma.service';
import { OrderCreateDto, OrderEntity } from 'src/validation/dto/order';
import { PaginationQueryDto } from 'src/validation/dto/shared';

@Injectable()
export class OrderRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
  ) {}

  private async _fetchAppConfiguration(): Promise<AppConfiguration> {
    return this.prisma.appConfiguration.findFirst();
  }

  private async _generateOrderNumber(): Promise<number> {
    const orderCount = await this.prisma.order.count();
    const orderNumber = (orderCount + 1).toString().padStart(6, '0');
    return +orderNumber;
  }

  async create(orderData: OrderCreateDto) {
    const orderNumber = await this._generateOrderNumber();
    const { customerId: telegramID, shopId, items, ...rest } = orderData;

    const existCustomer = await this.prisma.customer.findUnique({
      where: { telegramID },
    });

    if (!existCustomer)
      throw new NotFoundException(`Customer with ID ${telegramID} not found`);

    const transformedData: Prisma.OrderCreateInput = {
      ...rest,
      orderNumber: orderNumber,
      items: {
        create: items.map((item) => ({
          productItem: {
            connect: {
              id: item.productItemId,
            },
          },
          quantity: item.quantity,
          prices: [
            ...item.prices.map((obj) => ({
              price: obj.price,
              currency: obj.currency,
            })),
          ],
          shop: {
            connect: {
              id: shopId,
            },
          },
          color: {
            connect: {
              id: item.colorId,
            },
          },
          size: {
            connect: {
              id: item.sizeId,
            },
          },
        })),
      },
      customer: {
        connect: {
          telegramID,
        },
      },
      shop: {
        connect: {
          id: shopId,
        },
      },
    };
    const timestamp = new Date().getTime();
    orderData.items.forEach(async (item) => {
      const { stock, name } = await this.prisma.productItem.findFirst({
        where: { id: item.productItemId },
      });
      const redis_record_key = `${orderData.shopId}__${orderData.customerId}__${new Date().getTime()}`;
      if ((stock - item.quantity) / stock < 0)
        throw new Error('There are not enough products in stock');
      if (stock == item.quantity) {
        const log: IRedisLog = {
          timestamp,
          msgType: MsgType.ERROR,
          message: `${name} out of stock`,
        };

        await this.redis.set(redis_record_key, log, ONE_WEEK_IN_SECOND);
      }
      //less that 10%
      if ((stock - item.quantity) / stock < 0.1) {
        const log: IRedisLog = {
          timestamp,
          msgType: MsgType.WARNING,
          message: `${name} less than 10% left in stock`,
        };

        await this.redis.set(redis_record_key, log, ONE_WEEK_IN_SECOND);
      }
    });

    try {
      const order = await this.prisma.order.create({
        data: transformedData,
        include: { items: true },
      });
      const redis_record_key = `${orderData.shopId}__${orderData.customerId}__${timestamp}`;
      const log: IRedisLog = {
        timestamp,
        msgType: MsgType.INFO,
        message: `${telegramID} made an order`,
        customerId: orderData.customerId,
        orderId: order.id,
        orderStatus: order.status,
      };
      await this.redis.set(redis_record_key, log, ONE_WEEK_IN_SECOND);

      return order;
    } catch (error) {
      console.error(error);
    }
  }

  async findAll(paginationQuery: PaginationQueryDto, status?: OrderStatus) {
    const { limit, offset, sortingColumn, sort, searchString, shopId } =
      paginationQuery;

    const orderModelInstance = Prisma.OrderItemScalarFieldEnum;
    const validSortingColumns = Object.keys(orderModelInstance) as string[];

    if (sortingColumn && !validSortingColumns.includes(sortingColumn)) {
      throw new BadRequestException(
        `Invalid sorting column '${sortingColumn}'. List of valid columns: ${validSortingColumns}'.`,
      );
    }

    const whereClause: Prisma.OrderWhereInput = searchString
      ? {
          OR: [{ email: { contains: searchString, mode: 'insensitive' } }],
        }
      : {};

    const orders = await this.prisma.order.findMany({
      where: { ...whereClause, status, shopId },
      take: limit,
      skip: offset,
      orderBy: sortingColumn ? { [sortingColumn]: sort } : undefined,
      include: {
        customer: true,
        items: {
          include: {
            productItem: {
              include: {
                colors: true,
                sizes: true,
              },
            },
          },
        },
      },
    });

    return orders.map((order) => {
      const transformedItems = order.items.map((item) => ({
        ...item,
        prices: item.prices,
      }));

      //?!"" какой тип в 116
      const transformedTotalPrice = order.totalPrice as { price: number };

      const totalPriceWithDiscountAndDelivery =
        transformedTotalPrice[0]?.price ||
        transformedTotalPrice?.price -
          (order.discountAmount || 0) +
          (order.deliveryPrice || 0);

      return {
        ...order,
        totalPriceWithDiscountAndDelivery,
        items: transformedItems,
      };
    });
  }

  async findById(id: string, status?: OrderStatus) {
    const order = await this.prisma.order.findUnique({
      where: { id, ...(status && { status }) },
      include: {
        customer: true,
        items: {
          include: {
            productItem: {
              include: {
                colors: true,
                sizes: true,
              },
            },
          },
        },
      },
    });

    if (!order) return null;

    const transformedItems = order.items.map((item) => ({
      ...item,
      prices: convertJsonToPriceDto(String(item.prices)),
    }));

    const transformedTotalPrice = convertJsonToPriceDto(
      String(order.totalPrice),
    );

    const totalPriceWithDiscountAndDelivery =
      transformedTotalPrice.reduce((acc, priceObj) => {
        return acc + priceObj.price;
      }, 0) -
      (order.discountAmount || 0) +
      (order.deliveryPrice || 0);

    return {
      ...order,
      totalPriceWithDiscountAndDelivery,
      items: transformedItems,
    };
  }

  async incrementProductStock(productId: string, quantity: number) {
    await this.prisma.productItem.update({
      where: {
        id: productId,
      },
      data: {
        stock: {
          increment: quantity,
        },
      },
    });
  }

  async deleteOrderItemsByOrderId(orderId: string) {
    await this.prisma.orderItem.deleteMany({
      where: {
        orderId,
      },
    });
  }

  async update(id: string, orderData: Prisma.OrderUpdateInput): Promise<Order> {
    return this.prisma.order.update({
      where: { id },
      data: orderData,
      include: { items: { include: { productItem: true } } },
    });
  }

  async delete(id: string) {
    const deletedOrder = await this.prisma.order.delete({
      where: { id },
    });
    return deletedOrder;
  }

  async validateOrderItems(
    orderId: string,
    currency: string,
  ): Promise<{ isValid: boolean; details: string[] }> {
    const orderWithItems = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: { items: { include: { productItem: true } } },
    });

    if (!orderWithItems) {
      throw new Error('Order not found');
    }

    const config = await this._fetchAppConfiguration();
    const minimumAmount = orderWithItems.isDelivery
      ? config.minOrderAmountWithDelivery
      : config.minOrderAmountWithoutDelivery;

    let total = 0;
    orderWithItems.items.forEach((item) => {
      const prices = item.prices as { price: number; currency: string }[];
      const priceObject = prices.find((p) => p.currency === currency);
      if (priceObject) {
        total += priceObject.price * item.quantity;
      } else {
        throw new Error(`No price found for currency: ${currency}`);
      }
    });

    let isValid = true;
    const details = [];
    if (total < minimumAmount) {
      isValid = false;
      details.push(`Minimum order amount of ${minimumAmount} not reached.`);
    }

    orderWithItems.items.forEach((item) => {
      if (item.quantity > item.productItem.stock) {
        isValid = false;
        details.push(`Item ${item.productItem.name} exceeds available stock.`);
      }
    });

    return { isValid, details };
  }

  async getProductPriceById(id: string): Promise<JsonValue> {
    const entity = await this.prisma.productItem.findUnique({
      where: { id },
      select: { prices: true },
    });
    return entity.prices;
  }

  async findByCustomerTelegramID(telegramID: string): Promise<OrderEntity[]> {
    return this.prisma.order.findMany({
      where: {
        customer: {
          telegramID: telegramID,
        },
      },
      include: {
        customer: true,
        items: {
          include: {
            productItem: {
              include: {
                colors: true,
                sizes: true,
              },
            },
          },
        },
      },
    }) as unknown as OrderEntity[];
  }

  async findSingleOrderByCustomerTelegramID(
    telegramID: string,
    orderId: string,
  ): Promise<OrderEntity | null> {
    return this.prisma.order.findFirst({
      where: {
        id: orderId,
        customer: {
          telegramID: telegramID,
        },
      },
      include: {
        customer: true,
        items: {
          include: {
            productItem: {
              include: {
                colors: true,
                sizes: true,
              },
            },
          },
        },
      },
    }) as unknown as null | OrderEntity;
  }

  async applyPromoCode(
    orderId: string,
    promoCode: string,
  ): Promise<OrderEntity> {
    const promoCodeEntity = await this.prisma.promoCode.findUnique({
      where: { code: promoCode },
      select: {
        discount: true,
        isActive: true,
        startDate: true,
        endDate: true,
        id: true,
      },
    });

    if (
      !promoCodeEntity ||
      !promoCodeEntity.isActive ||
      new Date() < promoCodeEntity.startDate ||
      new Date() > promoCodeEntity.endDate
    ) {
      throw new Error('Invalid or inactive promo code.');
    }

    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      select: { totalPrice: true, deliveryPrice: true, currency: true },
    });

    if (!order) {
      throw new Error('Order not found.');
    }

    const netPrice =
      convertJsonToPriceDto(order.totalPrice.toString()).filter(
        (price) => price.currency === order.currency,
      )[0]?.price - (order.deliveryPrice || 0);
    const discountAmount = (promoCodeEntity.discount / 100) * netPrice;

    return this.prisma.order.update({
      where: { id: orderId },
      data: {
        promoCodeId: promoCodeEntity.id,
        discountAmount: discountAmount,
      },
    }) as unknown as OrderEntity;
  }

  async updateOrderAfterPayment(updateDto: {
    orderId: string;
    email: string;
    address: string;
    payment: string;
    status: OrderStatus;
  }): Promise<OrderEntity> {
    const { orderId, email, address, payment, status } = updateDto;

    return this.prisma.order.update({
      where: { id: orderId },
      data: {
        email,
        address,
        payment,
        status,
      },
      include: { items: true, customer: true },
    }) as unknown as OrderEntity;
  }

  async logToRedis({
    shopId,
    message,
    msgType,
    customerId,
    orderId,
    orderStatus,
  }: {
    shopId: string;
    message: string;
    msgType: MsgType;
    customerId?: string;
    orderId?: string;
    orderStatus?: OrderStatus;
  }) {
    const timestamp = new Date().getTime();
    const redis_record_key = `${shopId}__${customerId || 'anonymous'}__${timestamp}`;
    const log: IRedisLog = {
      timestamp,
      msgType,
      message,
      customerId: customerId,
      orderId: orderId,
      orderStatus,
    };
    await this.redis.set(redis_record_key, log, ONE_WEEK_IN_SECOND);
  }
}
