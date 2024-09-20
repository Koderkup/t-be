import { useQuery } from '@tanstack/react-query';
import { ProductService } from '../services';

export const useProductsAPI = (id?: string) => {
  const products = useQuery({
    queryKey: ['products'],
    queryFn: () => ProductService.getAllProducts(),
    select: ({ data }) => data,
  });

  const product = useQuery({
    queryKey: ['products', id],
    queryFn: () => ProductService.getProductById(id || ''),
    select: ({ data }) => data,
    enabled: !!id,
  });

  return { products, product };
};
