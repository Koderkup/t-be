import { useQuery } from '@tanstack/react-query';
import { CategoryService } from '../services';

export const useCategoriesAPI = (id?: string) => {
  const categories = useQuery({
    queryKey: ['categories'],
    queryFn: () => CategoryService.getAllCategories(),
    select: ({ data }) => data,
  });

  const category = useQuery({
    queryKey: ['category', id],
    queryFn: () => CategoryService.getCategoryById(id || ''),
    select: ({ data }) => data,
    enabled: !!id,
  });

  return { categories, category };
};
