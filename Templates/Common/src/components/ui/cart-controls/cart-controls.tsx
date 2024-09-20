import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { Paths } from '../../../shared/types/constants.ts';
import CartButton from './components/cart-button.tsx';
import AddToCardButton from './components/add-to-card-button.tsx';
import { useCart } from '../../../hooks/useCart.ts';

const CartControls: FC = () => {
  const { isCartEmpty, itemsCount } = useCart();
  const { pathname } = useLocation();
  const isProductPage = pathname.includes(Paths.PRODUCT);

  return (
    <div className="cart-controls">
      {!isCartEmpty && (
        <CartButton isProductPage={isProductPage} itemsCount={itemsCount} />
      )}

      {isProductPage && <AddToCardButton />}
    </div>
  );
};

export default CartControls;
