import { instance } from '../api/api.interceptor.ts';
import { UrlConfig } from './url.config.ts';
import { HttpMethod } from '../api/methods.ts';
import { ShopFields } from '../shared/types/shop.interface.ts';

const ShopService = {
  async getShopById(id: string | number) {
    return instance<ShopFields>({
      url: `${UrlConfig.SHOPS}/${id}`,
      method: HttpMethod.GET,
    });
  },
};

export default ShopService;
