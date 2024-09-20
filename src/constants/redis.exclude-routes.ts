import { RoutesEntities as r } from '@const/routes-entities';
import { RequestMethod as m } from '@nestjs/common';
import { RouteInfo } from '@nestjs/common/interfaces';
export const excludeRedisRoutes: RouteInfo[] = [
  {
    method: m.POST,
    path: `/${r.AD_BLOCKS}/active`,
  },
  {
    method: m.GET,
    path: `/${r.APP_CONFIGURATIONS}`,
  },
  {
    method: m.GET,
    path: `/${r.CARE_LISTS}/(.*)`,
  },
  {
    method: m.GET,
    path: `/${r.CATEGORY_TYPES}/(.*)`,
  },
  {
    method: m.GET,
    path: `/${r.COLORS}/(.*)`,
  },
  {
    method: m.ALL,
    path: `/${r.CUSTOMERS}/(.*)`,
  },
  {
    method: m.ALL,
    path: `/${r.DASHBOARDS}/(.*)`,
  },
  {
    method: m.ALL,
    path: `/${r.DESIGNS}/(.*)`,
  },
  {
    method: m.ALL,
    path: `/${r.FUNCTIONALITIES}/(.*)`,
  },
  {
    method: m.GET,
    path: `/${r.ORDERS}/(.*)`,
  },
  {
    method: m.PUT,
    path: `/${r.ORDERS}`,
  },
  {
    method: m.POST,
    path: `/${r.ORDERS}/purchase-stripe`,
  },
  {
    method: m.POST,
    path: `/${r.ORDERS}/purchase-paypal`,
  },
  {
    method: m.GET,
    path: `/${r.ORDERS}/customer/(.*)`,
  },
  {
    method: m.POST,
    path: `/${r.ORDERS}/stripe`,
  },
  {
    method: m.GET,
    path: `/${r.PRODUCTS_ITEMS}/(.*)`,
  },
  {
    method: m.GET,
    path: `/${r.PROMO_CODES}/(.*)`,
  },
  {
    method: m.GET,
    path: `/${r.PROMOTIONAL_BLOCKS}/(.*)`,
  },
  {
    method: m.ALL,
    path: `/${r.SEGMENTS}/(.*)`,
  },
  {
    method: m.GET,
    path: `/${r.SIZES}/(.*)`,
  },
  {
    method: m.ALL,
    path: `/${r.STATISTICS}/(.*)`,
  },
  {
    method: m.ALL,
    path: `/${r.USERS}/(.*)`,
  },
  {
    method: m.GET,
    path: `/${r.USERS_PAYMENTS}/(.*)`,
  },
  {
    method: m.POST,
    path: `/${r.SHOPS}/(.*)`,
  },
  {
    method: m.GET,
    path: `/${r.SHOPS}/(.*)`,
  },
];
