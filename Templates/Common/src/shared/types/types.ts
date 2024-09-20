import { Color } from '@/shared/types/color.interface.ts';
import { Size } from '@/shared/types/size.interface.ts';

export enum OrderStatuses {
  Pending = 'Pending',
  Paid = 'Paid',
  Confirmed = 'Confirmed',
  Shipped = 'Shipped',
  Delivered = 'Delivered',
  Cancelled = 'Cancelled',
}

export type CartItemType = {
  id: string;
  uniqueId: string;
  name: string;
  color: Color;
  price?: number | string;
  currency: string;
  size: Size;
  sizes?: Array<Size>;
  quantity: number;
  image: string;
};

export enum GridType {
  SINGLE = 'single',
  DOUBLE = 'double',
  MULTIPLE = 'multiple',
}

export enum ActionSheetTypes {
  CART = 'cart',
  SIZE = 'size',
  PAYMENT = 'payment',
}

export enum ModalTypes {
  STOCK_VALIDATION = 'stock-validation',
  USE_BONUSE = 'use-bonuse',
}

export enum SizeTableTypes {
  CM = 'cm',
  IN = 'IN',
}

export interface PromoCode {
  id: string;
  discount: number;
}

export type DropdownOptionType = {
  label: string;
  value: string | number;
  color?: string;
};

export interface HelpMessage {
  name: string;
  email: string;
  text: string;
}

export interface PromoCodeFormState {
  value: string;
  buttonText: 'Apply' | 'Remove';
  error: boolean | null;
  textWidth: number;
}

export interface DenmarkPromoCodeFormState {
  value: string;
  error: boolean | null;
}

export interface ItalyPromoCodeFormState {
  value: string;
  error: boolean | null;
  isValid: boolean;
}

export interface CustomerCurrency {
  currency: string;
}

export interface CreateCustomerDto {
  telegramID: string;
  shopId: string;
  lastLogin: Date;
}
