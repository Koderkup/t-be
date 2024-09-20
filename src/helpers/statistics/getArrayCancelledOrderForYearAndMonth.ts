import { ChartTimeRange } from '@local-types/statistics/chart-time-range';
import getOrderValue from './getOrderValue';
import isDateInTimeRange from './isDateInTimeRange';
import { Order } from '@prisma/client';
import { getSubstructDateUseTimeRange } from './getSubstructDateUseTimeRange';
//разбил временной диапазон на 4 части.
//у каждой секции есть начало и конец
//самое начало это startDate
//самая последняя дата endDate
export function getArrayCancelledOrderForYearAndMonth(
  cancelledOrdersInTimeRange: Order[],
  currency: string,
): number[] {
  const endDate: Date = new Date();
  const arrayCancelledOrder: number[] = [];
  const startDate: Date = getSubstructDateUseTimeRange(
    new Date(),
    ChartTimeRange.LastWeek,
  );
  const middleDate: Date = new Date(
    (endDate.getTime() + startDate.getTime()) / 2,
  );
  const endFirstSection: Date = new Date(
    (middleDate.getTime() + startDate.getTime()) / 2,
  );
  const beginThirdSection: Date = new Date(
    (middleDate.getTime() + endDate.getTime()) / 2,
  );
  const dateSections: Date[][] = [
    [startDate, endFirstSection],
    [endFirstSection, middleDate],
    [middleDate, beginThirdSection],
    [beginThirdSection, endDate],
  ];
  for (let i = 0; i < 4; i++) {
    arrayCancelledOrder.push(0);
    cancelledOrdersInTimeRange.forEach((cancelledOrder) => {
      //Ищу соотвествие всех элементов по текущей дате
      if (
        isDateInTimeRange(
          dateSections[i][0],
          dateSections[i][1],
          cancelledOrder.createdAt,
        )
      ) {
        const total = getOrderValue(cancelledOrder, currency);
        arrayCancelledOrder[i] = arrayCancelledOrder[i] + total;
      }
    });
  }
  return arrayCancelledOrder;
}
