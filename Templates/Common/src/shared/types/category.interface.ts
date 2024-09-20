import { Product } from '@/shared/types/product.interface.ts';

export type Category = {
  id: string;
  name: string;
  description: string;
  products: Product[];
};
