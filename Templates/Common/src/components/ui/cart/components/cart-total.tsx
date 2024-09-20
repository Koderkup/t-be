import { FC } from 'react';
import { Typo } from '../../../../components';
import { useCart } from '../../../../hooks/useCart.ts';
import CartDiscount from './cart-discount';
import { useMainStore } from '../../../../store';

const CartTotal: FC = () => {
  const { getCartTotal } = useCart();
  const { promoCode } = useMainStore();

  return (
    <>
      {promoCode && (
        <CartDiscount
          total={parseFloat(getCartTotal())}
          discount={promoCode?.discount ?? 0}
        />
      )}
      <div className="total">
        <Typo className="total__title">Subtotal</Typo>
        <Typo className="total__currency">{getCartTotal()} USD</Typo>
      </div>
    </>
  );
};

export default CartTotal;
