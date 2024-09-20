import { Injectable } from '@nestjs/common';
import {
  ProductWithProfit,
  SalesDetail,
  StatisticsRepository,
} from './statistics.repository';
import { ProductItemEntity } from 'src/validation/dto/product-item';
import {
  IRedisLog,
  IRedisUserActionLog,
} from '@interfaces/redis-logs.interface';
import { ONE_MINUTE_IN_MILLISECONDS } from '@root/constants/uploader.constant';
import { OrderStatus } from '@prisma/client';
import CheckoutConversionResultDto from '@validation/statistics/result-of-checkout-conversion';
import OnlineStoreConversionRateDto from '@validation/statistics/online-store-conversion-rate.dto';
import { ChartTimeRange } from '@local-types/statistics/chart-time-range';
import ChartDto from '@validation/statistics/chart.dto';
import { ChartType } from '@local-types/statistics/enum-chart-type';
import ChartDatasetsDto from '@validation/statistics/chart-datasets.dto';
import { getLabelsForChartDto } from '@helpers/statistics/getLabelsForChartDto';
import { getSplitDataOfCancelledOrders } from '@helpers/statistics/getSplitDataOfCancelledOrders';
import { getSortedWeekLabels } from '@helpers/statistics/getSortedWeekLabels';

@Injectable()
export class StatisticsService {
  constructor(private readonly repository: StatisticsRepository) {}

  async getTotalSalesRevenue(currency: string): Promise<number> {
    return this.repository.getTotalSalesRevenue(currency);
  }

  async getAverageOrderValue(currency: string): Promise<number> {
    return this.repository.getAverageOrderValue(currency);
  }
  //
  async getNetReturnValue(
    shopId: string,
    chartTimeRange: ChartTimeRange,
    currency: string,
  ): Promise<ChartDto[]> {
    //Получаю список отмененных заказов в определенном временном диапазоне
    const cancelledOrdersInTimeRange =
      await this.repository.getCancelledOrdersInTimeRange(
        shopId,
        chartTimeRange,
      );
    if (cancelledOrdersInTimeRange.length === 0) {
      throw new Error('Shop is not exists');
    }
    //Получаю разделенный список отмененных заказов
    let data: number[] = getSplitDataOfCancelledOrders(
      cancelledOrdersInTimeRange,
      chartTimeRange,
      currency,
    );
    //Инициализирую DTO
    //TODO: В идеале добавить Маппер для инициализации объекта
    let datasets: ChartDatasetsDto[] = [];
    datasets.push(new ChartDatasetsDto(null, null, data));
    //Получаю список Labels
    let labelsForChartDto = getLabelsForChartDto(chartTimeRange);
    if (chartTimeRange === ChartTimeRange.LastWeek) {
      //Получаю список Labels отсортированных относительно сегоднешнего дня по дням недели
      labelsForChartDto = getSortedWeekLabels(labelsForChartDto);
    }
    let dtos: ChartDto[] = [];
    //Добавляю и линейный тип графика и столбчатый
    dtos.push({
      labels: labelsForChartDto, //TODO: не понятно чем инициализировать
      title: null, //TODO: не понятно чем инициализировать
      type: ChartType.BarChart, //TODO: не понятно чем инициализировать
      datasets, //TODO: не понятно чем инициализировать
    });
    dtos.push({
      labels: labelsForChartDto, //TODO: не понятно чем инициализировать
      title: null, //TODO: не понятно чем инициализировать
      type: ChartType.LineChart, //TODO: не понятно чем инициализировать
      datasets, //TODO: не понятно чем инициализировать
    });
    return dtos;
  }

  async getSalesByProductWithDetails(currency: string): Promise<SalesDetail[]> {
    return this.repository.getSalesByProductWithDetails(currency);
  }

  async getRepeatCustomerRate(): Promise<number> {
    return this.repository.getRepeatCustomerRate();
  }

  async getStockLevels(): Promise<Partial<ProductItemEntity>[]> {
    return this.repository.getStockLevels();
  }

  async getProfitMargins(currency: string): Promise<ProductWithProfit[]> {
    return this.repository.getProfitMargins(currency);
  }

  async getAnalyticsFrequentlySoldProducts(shopId: string) {
    const res =
      await this.repository.getAnalyticsFrequentlySoldProducts(shopId);
    return res;
  }

  async getBounceRate(shopId: string) {
    const allShopUsersActionLogs: IRedisUserActionLog[] =
      await this.repository.getAllShopUsersActionLogs(shopId);
    // Создаем объект для хранения информации о пользователях
    const userStats: {
      [key: string]: {
        totalActions: number;
        visitedPages: Set<string>;
        timestamp: number | null;
      };
    } = {};

    // Проходимся по массиву действий пользователей
    allShopUsersActionLogs.forEach((action) => {
      const { customerId, link, timestamp } = action;

      // Если пользователь еще не добавлен в статистику, создаем запись
      if (!userStats[customerId]) {
        userStats[customerId] = {
          totalActions: 0,
          visitedPages: new Set(),
          timestamp: null,
        };
      }

      // Увеличиваем общее количество действий пользователя
      userStats[customerId].totalActions++;

      // Добавляем посещенную страницу в множество
      userStats[customerId].visitedPages.add(link);
    });

    // Создаем объект для хранения статистики по дням
    const dailyStats: {
      [key: string]: {
        totalUsers: number;
        singlePageVisitCount: number;
      };
    } = {};

    // Проходимся по пользователям и агрегируем данные по дням
    for (const customerId in userStats) {
      const { totalActions, visitedPages, timestamp } = userStats[customerId];
      const dateKey = new Date(timestamp).toLocaleDateString();

      if (totalActions === 1 && visitedPages.size === 1) {
        // Пользователь покинул сайт после 1 страницы
        if (!dailyStats[dateKey]) {
          dailyStats[dateKey] = { totalUsers: 0, singlePageVisitCount: 0 };
        }
        dailyStats[dateKey].singlePageVisitCount++;
      }

      // Увеличиваем общее количество пользователей для данного дня
      dailyStats[dateKey].totalUsers++;
    }

    // Создаем массив данных для графика
    const dailyBounceRateData = Object.keys(dailyStats).map((dateKey) => {
      const { totalUsers, singlePageVisitCount } = dailyStats[dateKey];
      const bounceRate = (singlePageVisitCount / totalUsers) * 100;
      return { date: dateKey, bounceRate };
    });

    // Возвращаем массив данных для графика
    return dailyBounceRateData;
  }

  async logUserAction(data: IRedisUserActionLog) {
    await this.repository.logUserAction(data);
    return 'Recorded.';
  }

  async calculateInstantPaymentPercentage(
    shopId: string,
  ): Promise<CheckoutConversionResultDto[]> {
    const logs: IRedisLog[] = await this.repository.getAllShopLogs(shopId);
    const paymentsByDate: {
      [date: number]: {
        confirmed: { [orderId: string]: number };
        paidWithin5Minutes: number;
      };
    } = {};

    logs.forEach((log) => {
      const date = new Date(log.timestamp).toISOString().split('T')[0];
      if (!paymentsByDate[date]) {
        paymentsByDate[date] = { confirmed: {}, paidWithin5Minutes: 0 };
      }

      if (log.orderStatus === OrderStatus.Confirmed) {
        paymentsByDate[date].confirmed[log.orderId!] = log.timestamp;
      } else if (log.orderStatus === OrderStatus.Paid) {
        const confirmedTimestamp = paymentsByDate[date].confirmed[log.orderId!];
        if (
          confirmedTimestamp &&
          log.timestamp - confirmedTimestamp <= 5 * ONE_MINUTE_IN_MILLISECONDS
        ) {
          paymentsByDate[date].paidWithin5Minutes++;
        }
      }
    });

    const result: { date: string; percentage: number }[] = [];
    for (const date in paymentsByDate) {
      const { confirmed, paidWithin5Minutes } = paymentsByDate[date];
      const confirmedCount = Object.keys(confirmed).length;
      const percentage =
        confirmedCount > 0 ? (paidWithin5Minutes / confirmedCount) * 100 : 0;
      result.push({ date, percentage });
    }

    return result;
  }

  async calculateDailyUniquePurchasePercentage(
    shopId: string,
  ): Promise<OnlineStoreConversionRateDto[]> {

    const logs: IRedisLog[] = await this.repository.getAllShopLogs(shopId);
    const visitorsByDate: {
      [date: string]: { visitors: Set<string>; purchasers: Set<string> };
    } = {};

    logs.forEach((log) => {
      const date = new Date(log.timestamp).toISOString().split('T')[0];
      if (!visitorsByDate[date]) {
        visitorsByDate[date] = { visitors: new Set(), purchasers: new Set() };
      }

      if (log.customerId) {
        visitorsByDate[date].visitors.add(log.customerId);
        if (log.orderStatus === OrderStatus.Paid) {
          visitorsByDate[date].purchasers.add(log.customerId);
        }
      }
    });

    const result: { date: string; percentage: number }[] = [];
    for (const date in visitorsByDate) {
      const { visitors, purchasers } = visitorsByDate[date];
      const visitorCount = visitors.size;
      const purchaserCount = purchasers.size;
      const percentage =
        visitorCount > 0 ? (purchaserCount / visitorCount) * 100 : 0;
      result.push({ date, percentage });
    }

    return result;
  }
}
