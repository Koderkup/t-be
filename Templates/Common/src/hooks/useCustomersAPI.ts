import { useMutation, useQuery } from '@tanstack/react-query';
import { CustomersService } from '../services';
import { CustomerCurrency } from '../shared/types/types';

export const useCustomersAPI = () => {
  const currencies = useQuery({
    queryKey: ['currencies'],
    queryFn: CustomersService.getAvailableCurrencies,
    select: ({ data }) => data,
  });

  const createCustomer = useMutation({
    mutationFn: CustomersService.createCustomer,
  });

  const updateCustomerPreferredCurrency = useMutation({
    mutationFn: ({
      telegramId,
      data,
    }: {
      telegramId: string;
      data: CustomerCurrency;
    }) => CustomersService.updateCustomerPreferredCurrency(telegramId, data),
  });

  return {
    currencies,
    updateCustomerPreferredCurrency,
    createCustomer,
  };
};
