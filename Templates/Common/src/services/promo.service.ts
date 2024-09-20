import { instance } from '../api/api.interceptor';
import { HttpMethod } from '../api/methods';
import { UrlConfig } from '../services/url.config';
import { PromoBlockType } from '../shared/types/promo-block.interface';

const PromoService = {
  async getActivePromo() {
    return instance<PromoBlockType>({
      url: `${UrlConfig.PROMOTIONAL_BLOCKS}/active`,
      method: HttpMethod.GET,
    });
  },
};

export default PromoService;
