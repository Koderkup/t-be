import { FC } from 'react';
import CartItem from './cart-item.tsx';
import { useCart } from '../../../../hooks/useCart.ts';
import { useMainStore } from '../../../../store';
import DenmarkCartItem from './denmark-ui/denmark-cart-item.tsx';

const CartItemList: FC = () => {
  const [designType] = useMainStore(state => [state.designType]);
  const { cart } = useCart();

  return (
    <div className="cart__items">
      {Array.from(cart.values()).map(item =>
        designType === 'denmark' ? (
          <DenmarkCartItem
            key={`${item.id}-${item.color.hexCode}-${item.name}`}
            {...item}
          />
        ) : (
          <CartItem
            key={`${item.id}-${item.color.hexCode}-${item.name}`}
            {...item}
          />
        )
      )}
    </div>
  );
};

export default CartItemList;
