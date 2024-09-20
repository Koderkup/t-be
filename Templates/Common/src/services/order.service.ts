import { instance } from '../api/api.interceptor.ts';
import { UrlConfig } from './url.config.ts';
import { HttpMethod } from '../api/methods.ts';
import { CreateOrderDTO, Order } from '../shared/types/order.interface.ts';

const OrderService = {
  async createOrder(data: CreateOrderDTO) {
    return instance<Order>({
      url: UrlConfig.ORDERS,
      method: HttpMethod.POST,
      data,
    });
  },

  async validateOrder(id: string) {
    return instance({
      url: `${UrlConfig.ORDERS}/${id}/validate?currency=USD`,
      method: HttpMethod.PUT,
    });
  },

  async updateOrder(data: Partial<Order>) {
    return instance<Order[]>({
      url: `${UrlConfig.ORDERS}/${data.id}`,
      method: HttpMethod.PATCH,
      data,
    });
  },

  async applyPromoCodeToOrder(data: { id: string; promoCode: string }) {
    return instance({
      url: `${UrlConfig.ORDERS}/${data.id}/apply-promocode/${data.promoCode}`,
      method: HttpMethod.PUT,
      data,
    });
  },

  async getAllOrders(telegramId: string) {
    return instance<Order[]>({
      url: `${UrlConfig.ORDERS}/customer/${telegramId}`,
      method: HttpMethod.GET,
    });
  },

  async getOrderById(telegramId: string, id: string) {
    return instance<Order>({
      url: `${UrlConfig.ORDERS}/customer/${telegramId}/orders/${id}`,
      method: HttpMethod.GET,
    });
  },
};

export default OrderService;
