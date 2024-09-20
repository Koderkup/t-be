import { Order } from '@prisma/client';
import { ChartTimeRange } from '@root/types/statistics/chart-time-range';
import { getArrayCancelledOrderForYearAndMonth } from './getArrayCancelledOrderForYearAndMonth';
import { getArrayCancelledOrderForWeek } from './getArrayCancelledOrderForWeek';
//Функция для раздления данных об отмененных заказах
export function getSplitDataOfCancelledOrders(
  cancelledOrdersInTimeRange: Order[],
  chartTimeRange: ChartTimeRange,
  currency: string,
): number[] {
  switch (chartTimeRange) {
    case ChartTimeRange.LastYear:
    case ChartTimeRange.LastMonth:
      const cancelledOrderForYearAndMonth =
        getArrayCancelledOrderForYearAndMonth(
          cancelledOrdersInTimeRange,
          currency,
        );
      return cancelledOrderForYearAndMonth;
    case ChartTimeRange.LastWeek:
      const cancelledOrderForWeek = getArrayCancelledOrderForWeek(
        cancelledOrdersInTimeRange,
        currency,
      );
      return cancelledOrderForWeek;
    default:
      throw new Error('Invalid ChartTimeRange');
  }
}
