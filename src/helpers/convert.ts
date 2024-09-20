import { JsonValue } from 'aws-sdk/clients/glue';
import { PriceDto } from 'src/validation/dto/shared';

export function convertPrices(pricesJson: JsonValue): PriceDto[] {
  return JSON.parse(pricesJson as string);
}

export function convertJsonToPriceDto(pricesJson: string): PriceDto[] {
  if (
    !pricesJson ||
    typeof pricesJson !== 'object' ||
    !Array.isArray(pricesJson)
  ) {
    return [];
  }

  return JSON.parse(pricesJson)!.map((price: PriceDto) => ({
    currency: price.currency,
    price: +price.price,
  })) as PriceDto[];
}

export function parsePrices(prices: JsonValue): PriceDto[] {
  if (typeof prices === 'string') {
    try {
      const parsed = JSON.parse(prices);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return []; // or handle the error as needed
    }
  }
  return [];
}
