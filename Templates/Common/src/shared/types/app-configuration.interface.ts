export interface ShopCurrency {
  value: string;
  label: string;
}

export interface AppConfiguration {
  id: string;
  minOrderAmountWithDelivery?: number;
  minOrderAmountWithoutDelivery?: number;
  location: string;
  phoneNumber: string;
  email: string;
  shopCurrencies: Array<ShopCurrency>;
}
