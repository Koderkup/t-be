import { ProductPrices } from '@/shared/types/product.interface.ts';
import { OrderStatuses } from '@/shared/types/types.ts';

export type OrderItem = {
  productItemId: string;
  quantity: number;
  productItem: {
    name: string;
    prices: Array<ProductPrices>;
    mediasUrl: Array<string>;
  };
  prices: Array<ProductPrices>;
};

export type Order = {
  id: string;
  customerId: string;
  address: string;
  payment: string;
  deliveryPrice: number;
  discountAmount: number;
  email: string;
  customer: {
    id: string;
    telegramID: string;
    orders: [null];
  };
  items: OrderItem[];
  totalPrice: Array<ProductPrices>;
  orderNumber: number;
  status: string;
  createdAt: Date;
};

export type CreateOrderDTO = {
  customerId: string;
  orderNumber?: number;
  items: {
    productItemId: string;
    quantity: number;
    colorId?: string;
    sizeId?: string;
    prices: Array<ProductPrices>;
  }[];
  currency: string;
  totalPrice: Array<ProductPrices>;
  status: OrderStatuses;
  shopId: string;
};
