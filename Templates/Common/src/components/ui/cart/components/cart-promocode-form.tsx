import { FC, FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import Input from '../../input/input';
import { usePromoCodesAPI } from '../../../../hooks/usePromoCodesAPI';
import { useCartStore, useMainStore } from '../../../../store';
import { usePaymentAPI } from '../../../../hooks/usePaymentAPI';
import CartPromoCodeButton from './cart-promocode-button';
import { PromoCodeFormState } from '../../../../shared/types/types';
import { checkPromoCodeDate } from '../../../../utils/check-promocode-date';

const CartPromocodeForm: FC = () => {
  const [formState, setFormState] = useState<PromoCodeFormState>({
    value: '',
    buttonText: 'Apply',
    error: null,
    textWidth: 0,
  });
  const spanEl = useRef<HTMLSpanElement>(null);
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
    setFormState(prev => ({
      ...prev,
      value: '',
      buttonText: 'Apply',
      error: null,
    }));
  }, [setPromoCode]);

  useEffect(() => {
    if (spanEl.current && formState.value.length > 0) {
      setFormState(prev => ({
        ...prev,
        textWidth: spanEl.current!.offsetWidth,
      }));
    }
  }, [formState.value]);
  return (
    <form onSubmit={handleSubmit} className="promo-code-form">
      <div>
        <Input
          id="promo-code"
          textWidth={formState.textWidth}
          placeholder="Promo code"
          className="input__full"
          value={formState.value}
          disabled={formState.buttonText === 'Remove'}
          isValid={formState.error === false}
          isError={formState.error}
          onChange={e =>
            setFormState(prevState => ({
              ...prevState,
              value: e.target.value,
            }))
          }
        />
        <span className="promo-code-form__value" ref={spanEl}>
          {formState.value}
        </span>
      </div>
      <CartPromoCodeButton
        buttonText={formState.buttonText}
        isValid={formState.error === false}
        isError={formState.error}
        clickFn={handleClick}
        isDisabled={formState.value.length < 4}
      />
    </form>
  );
};

export default CartPromocodeForm;
