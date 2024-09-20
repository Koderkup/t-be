import { FC } from 'react';
import { clsx as cn } from 'clsx';
import { CartItemType } from '../../../../shared/types/types.ts';
import { ProductAmountController, Typo } from '../../../../components';
import CartItemPrice from './cart-item-price.tsx';

type Props = CartItemType & {
  showRemoveButton?: boolean;
  disableAmountController?: boolean;
};

const CartItem: FC<Props> = ({
  uniqueId,
  name,
  color,
  size,
  price,
  image,
  currency,
  disableAmountController,
  showRemoveButton = true,
}) => {
  return (
    <div className="cart-item">
      <div className="cart-item__left-side">
        <img className="cart-item__image" src={image} alt={name} />
      </div>

      <div className="cart-item__right-side">
        <Typo className="cart-item__name">{name}</Typo>
        <div className="cart-item__wrapper">
          <div className="cart-item__inner">
            <div className="cart-item__info">
              <span
                className={cn(
                  'cart-item__show-color',
                  color.name === 'White' && 'cart-item__info--bordered'
                )}
                style={{ backgroundColor: color.hexCode }}
              />
            </div>
            <Typo className="cart-item__color">{color.name}</Typo>
          </div>

          <span className="cart-item__divider">/</span>
          <Typo className="cart-item__size">{size.name}</Typo>
        </div>

        <ProductAmountController
          accentColor="black"
          uniqueId={uniqueId}
          disabled={disableAmountController}
        />

        <CartItemPrice
          price={price}
          currency={currency}
          uniqueId={uniqueId}
          showRemoveButton={showRemoveButton}
        />
      </div>
    </div>
  );
};

export default CartItem;
