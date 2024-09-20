import { instance } from '../api/api.interceptor.ts';
import { UrlConfig } from './url.config.ts';
import { HttpMethod } from '../api/methods.ts';
import { PromoCode } from '../shared/types/promo-code.interface.ts';

const PromoCodeService = {
  async getAllPromoCodes() {
    return instance<PromoCode[]>({
      url: `${UrlConfig.PROMO_CODES}`,
      method: HttpMethod.GET,
    });
  },
};

export default PromoCodeService;
