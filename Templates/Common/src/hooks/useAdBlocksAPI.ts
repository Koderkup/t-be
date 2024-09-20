import { useQuery } from '@tanstack/react-query';
import { AdBlockService } from '../services';

export const useAdBlocksAPI = () => {
  const activeAdBlock = useQuery({
    queryFn: () => AdBlockService.getActiveAdBlock(),
    queryKey: ['activeAdBlock'],
    select: ({ data }) => data,
  });

  return { activeAdBlock };
};
