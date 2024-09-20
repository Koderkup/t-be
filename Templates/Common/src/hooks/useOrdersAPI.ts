import { useQuery } from '@tanstack/react-query';
import { OrderService } from '../services';

export const useOrdersAPI = (telegramID?: string, id?: string) => {
  const orders = useQuery({
    queryKey: ['orders', telegramID],
    queryFn: () => OrderService.getAllOrders(telegramID || ''),
    select: ({ data }) => data,
  });

  const order = useQuery({
    queryKey: ['orders', telegramID, id],
    queryFn: () => OrderService.getOrderById(telegramID || '', id || ''),
    select: ({ data }) => data,
    enabled: !!id,
    retry: false,
  });

  return { orders, order };
};
