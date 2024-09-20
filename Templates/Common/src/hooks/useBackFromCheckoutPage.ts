import { ActionSheetTypes } from '../shared';
import { useMainStore } from '../store';

export const useBackFromCheckoutPage = () => {
  const { closeActionSheet } = useMainStore();

  return () => {
    window.history.back();
    closeActionSheet(ActionSheetTypes.PAYMENT);
  };
};
