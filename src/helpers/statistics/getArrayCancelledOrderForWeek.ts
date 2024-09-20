import { Order } from '@prisma/client';
import getOrderValue from './getOrderValue';
import isDateEqualWithoutTime from './isDateEqualWithoutTime';
//Функция для получения массива дней недели относительно ChartTimeRange
export function getArrayCancelledOrderForWeek(
  cancelledOrdersInTimeRange: Order[],
  currency: string,
): number[] {
  const arrayCancelledOrder: number[] = [];
  //Иду по всем дням недели начиная с сегоднешнего дня (Сегодняшний день, может быть любым днем недели)
  for (let i = 0; i < 7; i++) {
    //Создаю массив, который будет хранить сумму отмененных заказов за конкретный день недели (начинаю с конца т.к. сегоднешний день на графике это крайний правый элемент)
    arrayCancelledOrder.push(0);
    let day: Date = new Date();
    day.setDate(day.getDate() - i);
    cancelledOrdersInTimeRange.forEach((cancelledOrder) => {
      //Ищу соотвествие всех элементов по текущей дате
      if (isDateEqualWithoutTime(day, cancelledOrder.createdAt)) {
        const total = getOrderValue(cancelledOrder, currency);
        arrayCancelledOrder[i] = arrayCancelledOrder[i] + total;
      }
    });
  }
  arrayCancelledOrder.reverse();
  return arrayCancelledOrder;
}
