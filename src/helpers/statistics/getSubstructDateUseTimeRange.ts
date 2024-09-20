import { ChartTimeRange } from '@root/types/statistics/chart-time-range';
//Функция для получения даты относительно сегоднешнего дня
export function getSubstructDateUseTimeRange(
  date: Date,
  chartTimeRange: ChartTimeRange,
): Date {
  switch (chartTimeRange) {
    case ChartTimeRange.LastYear:
      date.setFullYear(date.getFullYear() - 1);
      return date;
    case ChartTimeRange.LastMonth:
      date.setMonth(date.getMonth() - 1);
      return date;
    case ChartTimeRange.LastWeek:
      date.setDate(date.getDate() - 7);
      return date;
    default:
      throw new Error('Invalid ChartTimeRange');
  }
}
