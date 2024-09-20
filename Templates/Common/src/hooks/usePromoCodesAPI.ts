import { useQuery } from '@tanstack/react-query';
import { PromoCodeService } from '../services';

export const usePromoCodesAPI = () => {
  const promoCodes = useQuery({
    queryFn: () => PromoCodeService.getAllPromoCodes(),
    queryKey: ['promoCodes'],
    select: ({ data }) => data,
  });

  return { promoCodes };
};
