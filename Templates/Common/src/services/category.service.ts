import { instance } from '../api/api.interceptor.ts';
import { UrlConfig } from './url.config.ts';
import { HttpMethod } from '../api/methods.ts';
import { Category } from '../shared/types/category.interface.ts';

const CategoryService = {
  async getAllCategories() {
    return instance<Category[]>({
      url: `${UrlConfig.CATEGORIES}`,
      method: HttpMethod.GET,
    });
  },

  async getCategoryById(id: string) {
    return instance<Category>({
      url: `${UrlConfig.CATEGORIES}/${id}`,
      method: HttpMethod.GET,
    });
  },
};

export default CategoryService;
