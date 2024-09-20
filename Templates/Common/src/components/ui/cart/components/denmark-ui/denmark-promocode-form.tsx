import { FC, FormEvent, useCallback, useState } from 'react';
import { usePromoCodesAPI } from '../../../../../hooks/usePromoCodesAPI';
import { useCartStore, useMainStore } from '../../../../../store';
import { usePaymentAPI } from '../../../../../hooks/usePaymentAPI';
import CartPromoCodeButton from '../cart-promocode-button';
import { checkPromoCodeDate } from '../../../../../utils/check-promocode-date';
import DenmarkInput from '../../../denmark-ui/denmark-input/input';
import { DenmarkPromoCodeFormState } from '@/shared/types/types';

const DenmarkPromocodeForm: FC = () => {
  const [formState, setFormState] = useState<DenmarkPromoCodeFormState>({
    value: '',
    error: null,
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
        buttonText: 'Remove',
        error: false,
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
        buttonText: 'Remove',
        error: true,
      }));
    }
  };

  const handleClick = useCallback(() => {
    setPromoCode(null);
    setFormState({
      value: '',
      error: null,
    });
  }, [setPromoCode]);

  return (
    <form onSubmit={handleSubmit} className="promo-code-form">
      <DenmarkInput
        promocodeText="SPRINGSALE"
        id="promo-code"
        placeholder="Promo code"
        className="input__full"
        value={formState.value}
        isValid={formState.error === false}
        isError={formState.error}
        clickFn={handleClick}
        onChange={e =>
          setFormState(prevState => ({
            ...prevState,
            value: e.target.value,
          }))
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

export default DenmarkPromocodeForm;
