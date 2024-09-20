import { FC, useMemo } from 'react';
import { Button, Typo } from '../../../../index.ts';
import { useCart } from '../../../../../hooks/useCart.ts';
import CartDiscount from '../cart-discount.tsx';
import { useMainStore } from '../../../../../store/index.ts';
import { ModalTypes } from '../../../../../shared/index.ts';

const DenmarkCartTotal: FC = () => {
  const { getCartTotal, subtotalPrice } = useCart();
  const { promoCode, setModal } = useMainStore();

  const discountPrice = useMemo(
    () =>
      parseFloat(
        ((subtotalPrice() * (promoCode?.discount ?? 0)) / 100).toFixed(2)
      ),
    [promoCode, subtotalPrice]
  );

  const totalPrice = useMemo(
    () => subtotalPrice() + 0.99 - discountPrice,
    [discountPrice, subtotalPrice]
  );

  return (
    <div className="info_wrapper">
      <div className="total">
        <div className="total__wrapper">
          <Typo className="total__title">Subtotal</Typo>
          <Typo className="total__currency">{getCartTotal()} USD</Typo>
        </div>
        <div className="total__wrapper">
          <Typo className="total__title">Shipping</Typo>
          <Typo className="total__currency">0.99 USD</Typo>
        </div>
        {promoCode && (
          <CartDiscount
            total={parseFloat(getCartTotal())}
            discount={promoCode?.discount ?? 0}
          />
        )}
        <div className="total__wrapper">
          <Typo className="total__text">Total</Typo>
          <Typo className="total__text">{totalPrice} USD</Typo>
        </div>
      </div>
      <div className="user__bonuses">
        <Typo className="total__text">Use bonuses</Typo>
        <Button
          onClick={() => setModal(ModalTypes.USE_BONUSE)}
          className="user__bonuses__button"
        >
          USE
        </Button>
      </div>
    </div>
  );
};

export default DenmarkCartTotal;
