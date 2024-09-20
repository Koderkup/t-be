import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { convertJsonToPriceDto } from 'src/helpers/convert';
import { calculateTotalFromPrices } from 'src/helpers/calculate';
import { ProductItemEntity } from 'src/validation/dto/product-item';
import { Currency, Order, OrderStatus } from '@prisma/client';
import { RedisService } from '@modules/redis/redis.service';
import { IRedisUserActionLog } from '@interfaces/redis-logs.interface';
import { ChartTimeRange } from '@local-types/statistics/chart-time-range';
import { getSubstructDateUseTimeRange } from '@helpers/statistics/getSubstructDateUseTimeRange';

export interface ProductWithProfit {
  id: string;
  name: string;
  grossProfitMarginPercent: number;
}

export interface SalesDetail {
  productItem: {
    name: string;
    mediasUrl: string[];
  };
  total: number;
  price: number;
  quantity: number;
}

@Injectable()
export class StatisticsRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
  ) {}
  //
  async getCancelledOrdersInTimeRange(
    shopId: string,
    chartTimeRange: ChartTimeRange,
  ): Promise<Order[]>
  {
    let lte = getSubstructDateUseTimeRange(new Date(), chartTimeRange);
    const cancelledOrdersInTimeRange = await this.prisma.order.findMany({
      where: {
        shopId: shopId,
        status: OrderStatus.Cancelled,
        createdAt: {
          lte,
          gte: new Date(),
        },
      },
    });
    return cancelledOrdersInTimeRange;
  }

  async getTotalSalesRevenue(currency: string): Promise<number> {
    const orders = await this.prisma.order.findMany({
      where: { status: 'Delivered' },
      select: { totalPrice: true },
    });
    return orders.reduce((acc, order) => {
      const prices = convertJsonToPriceDto(
        order.totalPrice as unknown as string,
      );
      const total = calculateTotalFromPrices(prices, currency);
      return acc + total;
    }, 0);
  }

  async getAverageOrderValue(currency: string): Promise<number> {
    const orders = await this.prisma.order.findMany({
      where: { status: 'Delivered' },
      select: { totalPrice: true },
    });
    if (orders.length === 0) return 0;
    const totalRevenue = orders.reduce((acc, order) => {
      const prices = convertJsonToPriceDto(
        order.totalPrice as unknown as string,
      );
      const total = calculateTotalFromPrices(prices, currency);
      return acc + total;
    }, 0);
    return totalRevenue / orders.length;
  }

  async getProfitMargins(currency: string): Promise<ProductWithProfit[]> {
    const products = await this.prisma.productItem.findMany({
      select: {
        id: true,
        name: true,
        prices: true,
        cost: true,
      },
    });

    return products.map((product) => {
      const prices = convertJsonToPriceDto(product.prices as unknown as string);
      const priceObject = prices.find((price) => price.currency === currency);
      if (!priceObject) {
        throw new Error('Price in specified currency not found');
      }
      const grossProfitMarginPercent =
        ((priceObject.price - product.cost) / priceObject.price) * 100;
      return {
        id: product.id,
        name: product.name,
        grossProfitMarginPercent,
      };
    });
  }

  async getSalesByProductWithDetails(currency: string): Promise<SalesDetail[]> {
    const salesByProduct = await this.prisma.orderItem.groupBy({
      by: ['productItemId'],
      _sum: {
        quantity: true,
      },
    });

    const salesWithDetails = await Promise.all(
      salesByProduct.map(async (sale) => {
        const productItem = await this.prisma.productItem.findUnique({
          where: { id: sale.productItemId },
          select: {
            name: true,
            mediasUrl: true,
            prices: true,
          },
        });
        if (!productItem) {
          throw new Error(`Product item not found: ${sale.productItemId}`);
        }
        const prices = convertJsonToPriceDto(
          productItem.prices as unknown as string,
        );
        const priceObject = prices.find((p) => p.currency === currency);
        if (!priceObject) {
          throw new Error(
            `Price for currency ${currency} not found for product ${productItem.name}`,
          );
        }
        return {
          productItem: {
            name: productItem.name,
            mediasUrl: productItem.mediasUrl,
          },
          total: priceObject.price * sale._sum.quantity,
          price: priceObject.price,
          quantity: sale._sum.quantity,
        };
      }),
    );

    return salesWithDetails;
  }

  async getRepeatCustomerRate(): Promise<number> {
    const orders = await this.prisma.order.findMany({
      select: {
        customerId: true,
      },
    });

    const customerOrderCounts = orders.reduce((acc, order) => {
      acc[order.customerId] = (acc[order.customerId] || 0) + 1;
      return acc;
    }, {});

    const repeatCustomersCount = Object.values(customerOrderCounts).filter(
      (count) => Number(count) > 1,
    ).length;
    const totalCustomers = await this.prisma.customer.count();

    if (totalCustomers === 0) return 0;

    return (repeatCustomersCount / totalCustomers) * 100;
  }

  async getStockLevels(): Promise<Partial<ProductItemEntity>[]> {
    return this.prisma.productItem.findMany({
      select: {
        id: true,
        name: true,
        stock: true,
      },
    });
  }

  async getAnalyticsFrequentlySoldProducts(
    shopId: string,
  ): Promise<
    { currency: Currency; total: number; productItemId: string }[] | null
  > {
    return this.prisma.$queryRaw`
      SELECT (prices->0->>'currency')::text as "currency", 
      "productItemId",
      SUM("quantity" * CAST((prices->0->>'price') AS numeric)) as total
      FROM "OrderItem"
      WHERE "shopId" = ${shopId}
      GROUP BY "productItemId", "currency"
      ORDER BY total DESC
    `;
  }

  async getAllShopUsersActionLogs(shopId: string) {
    return this.redis.filterBy({ shopId: `action__${shopId}` }, true);
  }

  async getAllShopLogs(shopId: string) {
    return this.redis.filterBy({ shopId }, true);
  }

  async logUserAction(data: IRedisUserActionLog) {
    return this.redis.logUserAction(data);
  }
}
