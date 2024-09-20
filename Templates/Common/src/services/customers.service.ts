import { instance } from '../api/api.interceptor.ts';
import { UrlConfig } from './url.config.ts';
import { HttpMethod } from '../api/methods.ts';
import { ShopCurrency } from '../shared/types/app-configuration.interface.ts';
import { CreateCustomerDto, CustomerCurrency } from '../shared/types/types.ts';

const CustomersService = {
  async createCustomer(data: CreateCustomerDto) {
    return instance<CreateCustomerDto>({
      url: UrlConfig.CUSTOMERS,
      method: HttpMethod.POST,
      data,
    });
  },

  async getAvailableCurrencies() {
    return instance<ShopCurrency[]>({
      url: `${UrlConfig.CUSTOMERS}/available-currencies`,
      method: HttpMethod.GET,
    });
  },

  async updateCustomerPreferredCurrency(
    telegramId: string,
    data: CustomerCurrency
  ) {
    return instance<CustomerCurrency>({
      url: `${UrlConfig.CUSTOMERS}/${telegramId}/preferred-currency`,
      method: HttpMethod.PATCH,
      data,
    });
  },
};

export default CustomersService;
