import { ProductPrices } from '../shared/types/product.interface';

export function productPriceParse(
  data: Array<ProductPrices> | string
): ProductPrices {
  return typeof data === 'string' ? JSON.parse(data)[0] : data[0];
}
