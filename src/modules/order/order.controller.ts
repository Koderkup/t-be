import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
  Put,
  HttpCode,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { OrderService } from './order.service';
import {
  OrderEntity,
  OrderUpdateDto,
  OrderCreateDto,
  UpdateOrderPurchaseDto,
} from 'src/validation/dto/order';
import { PaginationQueryDto } from 'src/validation/dto/shared';
// import { CustomizedPaypalPurchaseDto } from 'src/validation/dto/order/order-paypal-purchase.dto';
// import { CustomizedStripePurchaseDto } from 'src/validation/dto/order/order-stripe-purchase.dto';
import { RoutesEntities } from '@root/constants/routes-entities';

@ApiTags(RoutesEntities.ORDERS)
@Controller(RoutesEntities.ORDERS)
export class OrderController {
  constructor(private readonly service: OrderService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The order has been successfully created.',
    type: OrderEntity,
  })
  @HttpCode(201)
  async create(@Body() orderData: OrderCreateDto) {
    return this.service.create(orderData);
  }

  @Get()
  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return all orders.',
    type: [OrderEntity],
  })
  async findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.service.findAll(paginationQuery);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an order by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return an order by id.',
    type: OrderEntity,
  })
  async findById(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an order by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The order has been successfully updated.',
    type: OrderEntity,
  })
  @ApiQuery({
    name: 'shopId',
    required: false,
    description: 'It need for redis logging any info about actions with shop',
  })
  async update(@Param('id') id: string, @Body() orderData: OrderUpdateDto) {
    return this.service.update(id, orderData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an order by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The order has been successfully deleted.',
  })
  @ApiQuery({
    name: 'shopId',
    required: false,
    description: 'It need for redis logging any info about actions with shop',
  })
  async delete(
    @Param('id') id: string,

    @Query('shopId') shopId: string,
  ) {
    return this.service.delete(id, shopId);
  }

  @Put(':id/validate')
  @ApiOperation({ summary: 'Validate an order for availability and currency' })
  @ApiResponse({
    status: HttpStatus.OK,
    description:
      'All items in the order are available and the currency is valid.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description:
      'One or more items in the order are not available in stock or currency is invalid.',
  })
  @ApiQuery({
    name: 'currency',
    type: String,
    description: 'Currency code to validate the order prices',
  })
  async validateOrder(
    @Param('id') id: string,
    @Query('currency') currency: string,
  ) {
    return this.service.validateOrder(id, currency);
  }

  // TODO: разберись с дтошками(когда до страйпа дойдешь)

  // @Post('purchase-stripe')
  // @ApiOperation({ summary: 'Purchase product items' })
  // @ApiResponse({
  //   status: HttpStatus.CREATED,
  //   description: 'The purchase has been successfully processed.',
  //   // type: ProductItemEntity,
  // })
  // @HttpCode(201)
  // async purchaseWithStripe(@Body() purchaseDto: CustomizedStripePurchaseDto) {
  //   return this.service.purchaseItemsWithStripe(purchaseDto);
  // }

  // @Post('purchase-paypal')
  // @ApiOperation({ summary: 'Purchase product items with PayPal' })
  // @ApiResponse({
  //   status: HttpStatus.CREATED,
  //   description: 'The PayPal purchase has been initiated.',
  //   // type: ProductItemEntity,
  // })
  // @HttpCode(201)
  // async purchaseWithPaypal(@Body() purchaseDto: CustomizedPaypalPurchaseDto) {
  //   return this.service.purchaseItemsWithPaypal(purchaseDto);
  // }

  @Get('/customer/:telegramID')
  @ApiOperation({ summary: 'Get orders by customer Telegram ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return all orders for a specified customer.',
    type: [OrderEntity],
  })
  async findByCustomerTelegramID(@Param('telegramID') telegramID: string) {
    return this.service.findByCustomerTelegramID(telegramID);
  }

  @Get('/customer/:telegramID/orders/:orderId')
  @ApiOperation({
    summary: 'Get a specific order by customer Telegram ID and order ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return a specific order for a specified customer.',
    type: OrderEntity,
  })
  async findSingleOrderByCustomerTelegramID(
    @Param('telegramID') telegramID: string,
    @Param('orderId') orderId: string,
  ) {
    return this.service.findSingleOrderByCustomerTelegramID(
      telegramID,
      orderId,
    );
  }

  @Put(':id/apply-promocode/:promoCode')
  @ApiOperation({ summary: 'Apply a promo code to an order' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Promo code applied successfully.',
    type: OrderEntity,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error applying promo code to order.',
  })
  async applyPromoCode(
    @Param('id') orderId: string,
    @Param('promoCode') promoCode: string,
  ) {
    return this.service.applyPromoCode(orderId, promoCode);
  }

  @Post('stripe')
  @ApiOperation({ summary: 'Update order after payment' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The order has been successfully updated after payment.',
    type: OrderEntity,
  })
  async updateAfterPayment(@Body() updateDto: UpdateOrderPurchaseDto) {
    return this.service.updateOrderAfterPayment(updateDto);
  }
}
