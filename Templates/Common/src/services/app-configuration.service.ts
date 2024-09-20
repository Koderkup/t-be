import { instance } from '../api/api.interceptor.ts';
import { UrlConfig } from './url.config.ts';
import { HttpMethod } from '../api/methods.ts';
import { AppConfiguration } from '../shared/types/app-configuration.interface';
import { HelpMessage } from '../shared/types/types.ts';

const AppConfigurationService = {
  async getAppConfiguration() {
    return instance<AppConfiguration>({
      url: `${UrlConfig.CONFIGURATIONS}`,
      method: HttpMethod.GET,
    });
  },

  async sendHelpMessage(data: HelpMessage) {
    return instance({
      url: `${UrlConfig.CONFIGURATIONS}/send-email`,
      method: HttpMethod.POST,
      data,
    });
  },
};

export default AppConfigurationService;
