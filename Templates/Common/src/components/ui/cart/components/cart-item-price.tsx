import { FC } from 'react';
import { Typo } from '../../../../components';
import { useCart } from '../../../../hooks/useCart.ts';
import { CartItemType } from '../../../../shared/types/types.ts';

type Props = Pick<CartItemType, 'price' | 'currency' | 'uniqueId'> & {
  showRemoveButton?: boolean;
};

const CartItemPrice: FC<Props> = ({
  price,
  showRemoveButton,
  uniqueId,
  currency,
}) => {
  const { removeItem } = useCart();

  return (
    <div className="cart-item__price">
      <Typo className="cart-item__price--text">
        {price} {currency}
      </Typo>
      {showRemoveButton && (
        <button
          type="button"
          className="cart-item__remove"
          onClick={() => removeItem(uniqueId)}
        >
          <Typo className="cart-item__remove--text">Remove</Typo>
        </button>
      )}
    </div>
  );
};

export default CartItemPrice;
