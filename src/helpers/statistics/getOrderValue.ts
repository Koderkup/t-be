import { calculateTotalFromPrices } from '@helpers/calculate';
import { convertJsonToPriceDto } from '@helpers/convert';
import { Order } from '@prisma/client';
import { PriceDto } from '@validation/shared';
//Функция для получения стоимости заказа
export default function getOrderValue(order: Order, currency: string): number {
  const prices: PriceDto[] = convertJsonToPriceDto(
    order.totalPrice as unknown as string,
  );
  const total: number = calculateTotalFromPrices(prices, currency);
  return total;
}
