import { FC, useMemo } from 'react';
import { Typo } from '../../../../components';

interface CartDiscountProps {
  total: number;
  discount: number;
}

const CartDiscount: FC<CartDiscountProps> = ({ total, discount }) => {
  const discountPrice = useMemo(
    () => parseFloat(((total * discount) / 100).toFixed(2)),
    [discount, total]
  );

  return (
    <div className="discount">
      <Typo className="discount__text">Discount</Typo>
      <Typo className="discount__price">-{discountPrice} USD</Typo>
    </div>
  );
};

export default CartDiscount;
