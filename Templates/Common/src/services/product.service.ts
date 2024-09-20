import { instance } from '../api/api.interceptor.ts';
import { UrlConfig } from './url.config.ts';
import { HttpMethod } from '../api/methods.ts';
import { Product } from '../shared/types/product.interface.ts';

const ProductService = {
  async getAllProducts() {
    return instance<Product[]>({
      url: `${UrlConfig.PRODUCTS}`,
      method: HttpMethod.GET,
    });
  },

  async getProductById(id: string) {
    return instance<Product>({
      url: `${UrlConfig.PRODUCTS}/${id}`,
      method: HttpMethod.GET,
    });
  },
};

export default ProductService;
