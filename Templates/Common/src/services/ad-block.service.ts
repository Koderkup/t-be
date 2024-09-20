import { instance } from '../api/api.interceptor.ts';
import { UrlConfig } from './url.config.ts';
import { HttpMethod } from '../api/methods.ts';
import { AdBlock } from '../shared/types/ad-block.interface.ts';

const AdBlockService = {
  async getActiveAdBlock() {
    return instance<AdBlock>({
      url: `${UrlConfig.AD_BLOCKS}/active`,
      method: HttpMethod.GET,
    });
  },
};

export default AdBlockService;
