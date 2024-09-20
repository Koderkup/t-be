import { ChartLabelsLastMonth } from '@root/constants/statistics/chart-labels-last-month';
import { ChartLabelsLastWeek } from '@root/constants/statistics/chart-labels-last-week';
import { ChartLabelsLastYear } from '@root/constants/statistics/chart-labels-last-year';
import { ChartTimeRange } from '@local-types/statistics/chart-time-range';
//Функция для получения массива дней недели относительно ChartTimeRange
export function getLabelsForChartDto(chartTimeRange: ChartTimeRange): string[] {
  switch (chartTimeRange) {
    case ChartTimeRange.LastYear:
      return ChartLabelsLastYear;
    case ChartTimeRange.LastMonth:
      return ChartLabelsLastMonth;
    case ChartTimeRange.LastWeek:
      return ChartLabelsLastWeek;
    default:
      throw new Error('Invalid ChartTimeRange');
  }
}
