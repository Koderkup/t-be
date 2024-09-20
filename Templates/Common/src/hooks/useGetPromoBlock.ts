import { useQuery } from '@tanstack/react-query';
import { PromoService } from '../services';

export const useGetPromoBlock = () => {
  return useQuery({
    queryKey: ['activePromo'],
    queryFn: () => PromoService.getActivePromo(),
    select: data => data.data,
  });
};
