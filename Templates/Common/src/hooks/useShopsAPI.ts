import { useQuery } from '@tanstack/react-query';
import { ShopService } from '../services';

export const useShopsAPI = (id?: string) => {
  const shop = useQuery({
    queryKey: ['shops', id],
    queryFn: () => ShopService.getShopById(id || ''),
    select: ({ data }) => data,
    enabled: !!id,
  });

  return { shop };
};
