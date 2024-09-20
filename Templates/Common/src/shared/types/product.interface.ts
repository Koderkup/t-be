import { CareList } from '@/shared/types/care-list.interface.ts';
import { Color } from '@/shared/types/color.interface.ts';
import { Size } from '@/shared/types/size.interface.ts';
import { Recommendation } from '@/shared/types/recommendation.interface.ts';
import { Category } from '@/shared/types/category.interface.ts';

export interface ProductPrices {
  price: number;
  currency: string;
}

export type Product = {
  id: string;
  name: string;
  descriptionFull: string;
  descriptionShort: string;
  discount: number;
  prices: Array<ProductPrices>;
  cost: number;
  stock: number;
  careList: CareList;
  colors: Color[];
  sizes: Size[];
  mediasUrl: string[];
  recommendations: Recommendation[];
  recommendedBy: Recommendation[];
  categoryType: Omit<Category, 'products'>;
  isFeatured: boolean;
  featuredText: string;
};
