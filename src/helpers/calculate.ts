import { PriceDto } from 'src/validation/dto/shared';

export function calculateTotalFromPrices(
  prices: PriceDto[],
  currency: string,
): number {
  const price = prices.find((price) => price.currency === currency);
  return price ? price.price : 0;
}
