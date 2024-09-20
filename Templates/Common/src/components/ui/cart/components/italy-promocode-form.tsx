import { FC, FormEvent, useCallback, useState } from 'react';
import { usePromoCodesAPI } from '../../../../hooks/usePromoCodesAPI';
import { useCartStore, useMainStore } from '../../../../store';
import { usePaymentAPI } from '../../../../hooks/usePaymentAPI';
import CartPromoCodeButton from './cart-promocode-button';
import { checkPromoCodeDate } from '../../../../utils/check-promocode-date';
import ItalyInput from '../../italy-ui/italy-input/italy-input';
import { ItalyPromoCodeFormState } from '@/shared/types/types';

const ItalyPromocodeForm: FC = () => {
  const [formState, setFormState] = useState<ItalyPromoCodeFormState>({
    value: '',
    error: null,
    isValid: false,
  });
  const { promoCodes } = usePromoCodesAPI();
  const { setPromoCode } = useMainStore();
  const { applyPromoCodeToOrder } = usePaymentAPI();
  const [orderId] = useCartStore(state => [state.orderId]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const foundPromoCode = promoCodes.data?.find(
      el => el.code === formState.value
    );

    const isValidPromoCode =
      foundPromoCode &&
      foundPromoCode.isActive &&
      checkPromoCodeDate(foundPromoCode.startDate, foundPromoCode.endDate);

    if (isValidPromoCode) {
      setFormState(prev => ({
        ...prev,
        error: false,
        isValid: true,
      }));
      applyPromoCodeToOrder.mutate({
        id: orderId || '',
        promoCode: foundPromoCode.code,
      });
      setPromoCode({
        id: foundPromoCode.id,
        discount: foundPromoCode.discount,
      });
    }
    if (!isValidPromoCode) {
      setFormState(prev => ({
        ...prev,
        error: true,
      }));
    }
  };

  const handleClick = useCallback(() => {
    setPromoCode(null);
    setFormState(prev => ({
      ...prev,
      value: '',
      error: null,
    }));
  }, [setPromoCode]);

  return (
    <form onSubmit={handleSubmit} className="promo-code-form">
      <ItalyInput
        id="promo-code"
        placeholder="Promo code"
        className="input__full"
        value={formState.value}
        isValid={formState.isValid}
        isError={formState.error}
        onChange={e =>
          setFormState({
            isValid: false,
            error: false,
            value: e.target.value,
          })
        }
      />
      <CartPromoCodeButton
        buttonText="Apply"
        isValid={formState.error === false}
        isError={formState.error}
        clickFn={handleClick}
        isDisabled={formState.value.length < 4}
      />
    </form>
  );
};

export default ItalyPromocodeForm;
