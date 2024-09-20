export enum Paths {
  HOME = '/',
  CATEGORIES = '/categories',
  PRODUCT = '/product',
  ORDER_HISTORY = '/order-history',
  PROFILE_INFORMATION = '/profile',
  INFO = '/info',
  STRIPE = '/stripe',
}

export enum PaymentMethods {
  PAYPAL = 'paypal',
  STRIPE = 'stripe',
  GOOGLE = 'google',
  TON = 'ton',
}

export const EMAIL_VALIDATION_PATTERN =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
