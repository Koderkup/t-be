import { useMutation } from '@tanstack/react-query';
import { useCartStore, useMainStore } from '../store';
import { OrderService } from '../services';
import { ActionSheetTypes, ModalTypes } from '../shared';

export const usePaymentAPI = () => {
  const { setModal, setActionSheets } = useMainStore();
  const { setOrderId, orderId } = useCartStore();

  const validateOrder = useMutation({
    mutationKey: ['validateOrder'],
    mutationFn: OrderService.validateOrder,
    onSuccess: () => {
      setActionSheets(ActionSheetTypes.PAYMENT);
    },
    onError: () => {
      setModal(ModalTypes.STOCK_VALIDATION);
    },
  });

  const createOrder = useMutation({
    mutationFn: OrderService.createOrder,
    mutationKey: ['createOrder'],
    onSuccess: ({ data }) => {
      setOrderId(data?.id);
    },
  });

  const updateOrder = useMutation({
    mutationFn: OrderService.updateOrder,
    mutationKey: ['updateOrder'],
    onSuccess: () => {
      if (orderId) validateOrder.mutate(orderId);
    },
  });

  const applyPromoCodeToOrder = useMutation({
    mutationFn: OrderService.applyPromoCodeToOrder,
    mutationKey: ['applyPromoCode'],
  });

  return { validateOrder, createOrder, applyPromoCodeToOrder, updateOrder };
};
