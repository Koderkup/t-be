import { FC } from 'react';
import { CartItemType } from '../../../../../shared/types/types.ts';
import { ProductAmountController, Typo } from '../../../../index.ts';
import { useCart } from '../../../../../hooks/useCart.ts';
import SizeDropdown from '../../../size-dropdown/size-dropdown.tsx';

type Props = CartItemType & {
  disableAmountController?: boolean;
};

const DenmarkCartItem: FC<Props> = ({
  uniqueId,
  name,
  price,
  image,
  currency,
  disableAmountController,
  size,
  sizes,
}) => {
  const { removeItem } = useCart();

  return (
    <div className="cart-item">
      <div className="cart-item__left-side">
        <img className="cart-item__image" src={image} alt={name} />
      </div>

      <div className="cart-item__right-side">
        <div className="cart-item__information">
          <Typo className="cart-item__name">{name}</Typo>
          <Typo className="cart-item__price--text">
            {price} {currency}
          </Typo>
        </div>
        <div className="cart-item__wrapper">
          <div className="cart-item__sizeBlock">
            <Typo className="cart-item__size">Size</Typo>
            <SizeDropdown
              uniqueId={uniqueId}
              options={sizes || []}
              size={size}
            />
          </div>
          <div className="cart-item__amountBlock">
            <Typo className="cart-item__amount">Quantity</Typo>
            <ProductAmountController
              accentColor="black"
              uniqueId={uniqueId}
              disabled={disableAmountController}
            />
          </div>
        </div>

        <button
          type="button"
          className="cart-item__remove"
          onClick={() => removeItem(uniqueId)}
        >
          <Typo className="cart-item__remove--text">Remove</Typo>
        </button>
      </div>
    </div>
  );
};

export default DenmarkCartItem;
