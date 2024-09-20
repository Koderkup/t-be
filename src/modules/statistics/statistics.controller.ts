import {
  // Body,
  Controller,
  Get,
  HttpStatus,
  // Post,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  // ApiBody,
} from '@nestjs/swagger';
import { StatisticsService } from './statistics.service';
import { RoutesEntities } from '@root/constants/routes-entities';
import { ChartTimeRange } from '@local-types/statistics/chart-time-range';
// import UserActionLog from '@validation/statistics/user-action-log.dto';
// import CheckoutConversionResultDto from '@validation/statistics/result-of-checkout-conversion';
// import OnlineStoreConversionRateDto from '@validation/statistics/online-store-conversion-rate.dto';

@ApiTags(RoutesEntities.STATISTICS)
@Controller(RoutesEntities.STATISTICS)
export class StatisticsController {
  constructor(private readonly service: StatisticsService) {}

  @Get('total-sales-revenue')
  @ApiOperation({ summary: 'Get total sales revenue' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The total sales revenue.',
  })
  @ApiQuery({
    name: 'currency',
    description: 'Currency code for sales revenue calculation',
    required: true,
  })
  getTotalSalesRevenue(@Query('currency') currency: string) {
    return this.service.getTotalSalesRevenue(currency);
  }

  @Get('average-order-value')
  @ApiOperation({ summary: 'Get average order value' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The average order value.',
  })
  @ApiQuery({
    name: 'currency',
    description: 'Currency code for average order value calculation',
    required: true,
  })
  getAverageOrderValue(@Query('currency') currency: string) {
    return this.service.getAverageOrderValue(currency);
  }
  //
  @Get('net-return-value')
  getNetReturnValue(
    @Query('shopId') shopId: string,
    @Query('chartTimeRange') chartTimeRange: ChartTimeRange,
    @Query('currency') currency: string,
  ) {
    return this.service.getNetReturnValue(shopId, chartTimeRange, currency);
  }

  // @Get('sales-by-product-category')
  // @ApiOperation({ summary: 'Get sales by product or category' })
  // @ApiResponse({
  //   status: HttpStatus.OK,
  //   description: 'Sales by product or category.',
  // })
  // @ApiQuery({
  //   name: 'currency',
  //   description: 'Currency code for sales data calculation',
  //   required: true,
  // })
  // getSalesByProductOrCategory(@Query('currency') currency: string) {
  //   return this.service.getSalesByProductWithDetails(currency);
  // }

  @Get('repeat-customer-rate')
  @ApiOperation({ summary: 'Get repeat customer rate' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The repeat customer rate indicating customer loyalty.',
  })
  getRepeatCustomerRate() {
    return this.service.getRepeatCustomerRate();
  }

  @Get('stock-levels')
  @ApiOperation({ summary: 'Get current stock levels for each product' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Current stock levels for each product.',
  })
  getStockLevels() {
    return this.service.getStockLevels();
  }

  // @Get('profit-margins')
  // @ApiOperation({
  //   summary: 'Get profit margins for overall sales and per product',
  // })
  // @ApiResponse({
  //   status: HttpStatus.OK,
  //   description:
  //     'Gross and net profit margins for overall sales and per product.',
  // })
  // @ApiQuery({
  //   name: 'currency',
  //   description: 'Currency code for profit margin calculation',
  //   required: true,
  // })
  // getProfitMargins(@Query('currency') currency: string) {
  //   return this.service.getProfitMargins(currency);
  // }

  @Get('get-analytics-frequently-sold-products')
  @ApiOperation({
    summary: 'Returns a selection (statistics) of frequently sold products',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Sales by product by category.',
  })
  getAnalyticsFrequentlySoldProducts(@Query('shopId') shopId: string) {
    return this.service.getAnalyticsFrequentlySoldProducts(shopId);
  }

  @Get('get-bounce-rate')
  @ApiOperation({
    summary: 'Returns a bounce rate for shop',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The bounce rate.',
  })
  @ApiQuery({
    name: 'shopId',
    description: 'Shop Id',
    required: true,
  })
  getBounceRate(@Query('shopId') shopId: string) {
    return this.service.getBounceRate(shopId);
  }

  // @Get('get-сheckout-сonversion')
  // @ApiOperation({
  //   summary: 'Return Conversion when processing a return ',
  // })
  // @ApiResponse({
  //   status: HttpStatus.OK,
  //   description: 'The сheckout сonversion.',
  //   type: [CheckoutConversionResultDto],
  // })
  // @ApiQuery({
  //   name: 'shopId',
  //   description: 'Shop Id',
  //   required: true,
  // })
  // getCheckoutConversion(@Query('shopId') shopId: string) {
  //   return this.service.calculateInstantPaymentPercentage(shopId);
  // }

  // @Get('get-online-store-сonversion-rate')
  // @ApiOperation({
  //   summary: 'Return Conversion when processing a return ',
  // })
  // @ApiResponse({
  //   status: HttpStatus.OK,
  //   description: 'Online store сonversion rate.',
  //   type: [OnlineStoreConversionRateDto],
  // })
  // @ApiQuery({
  //   name: 'shopId',
  //   description: 'Shop Id',
  //   required: true,
  // })
  // getStoreConversionRate(@Query('shopId') shopId: string) {
  //   return this.service.calculateDailyUniquePurchasePercentage(shopId);
  // }

  // @Post('follow-link-log')
  // @ApiOperation({
  //   summary: 'Returns void',
  // })
  // @ApiResponse({
  //   status: HttpStatus.OK,
  //   description: 'Recorded.',
  // })
  // @ApiBody({ type: UserActionLog })
  // logAnyUserFollowLink(@Body() body: UserActionLog) {
  //   return this.service.logUserAction(body);
  // }
}
