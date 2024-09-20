import { ProductPrices } from './product.interface';

export type Recommendation = {
  id: string;
  name: string;
  descriptionShort: string;
  prices: Array<ProductPrices>;
  mediasUrl: string[];
};
