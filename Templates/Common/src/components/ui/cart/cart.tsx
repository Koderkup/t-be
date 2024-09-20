import { FC, useMemo } from 'react';
import { Typo } from '../../../components';
import CartItemList from './components/cart-item-list.tsx';
import CartTotal from './components/cart-total.tsx';
import CartPromocodeForm from './components/cart-promocode-form.tsx';
import { useMainStore } from '../../../store';
import ItalyPromocodeForm from './components/italy-promocode-form.tsx';
import DenmarkPromocodeForm from './components/denmark-ui/denmark-promocode-form.tsx';
import DenmarkCartTotal from './components/denmark-ui/denmark-cart-total.tsx';

const Cart: FC = () => {
  const [designType] = useMainStore(state => [state.designType]);

  const activeForm = useMemo(() => {
    switch (designType) {
      case 'italy':
        return <ItalyPromocodeForm />;
      case 'denmark':
        return <DenmarkPromocodeForm />;
      default:
        return <CartPromocodeForm />;
    }
  }, [designType]);

  return (
    <div className="cart__wrapper">
      <Typo className="cart__title">Your style awaits in the cart!</Typo>

      <CartItemList />
      {activeForm}
      {designType === 'denmark' || designType === 'italy' ? (
        <DenmarkCartTotal />
      ) : (
        <CartTotal />
      )}
    </div>
  );
};

export default Cart;
