import { FC } from 'react';
import ModalRoot from '../modal-root.tsx';
import { useCart } from '../../../../hooks/useCart.ts';
import CartItem from '../../cart/components/cart-item.tsx';
import { useMainStore } from '../../../../store';
import DenmarkCartItem from '../../cart/components/denmark-ui/denmark-cart-item.tsx';

const StockValidationModal: FC = () => {
  const [designType] = useMainStore(state => [state.designType]);
  const { cart } = useCart();

  return (
    <ModalRoot>
      <div className="stock-validation">
        {Array.from(cart.values()).map(item =>
          designType === 'denmark' ? (
            <div
              className="stock-validation__item"
              key={`${item.id}-${item.color.hexCode}-${item.name}`}
            >
              <DenmarkCartItem disableAmountController {...item} />
            </div>
          ) : (
            <CartItem
              key={`${item.id}-${item.color.hexCode}-${item.name}`}
              showRemoveButton={false}
              disableAmountController
              {...item}
            />
          )
        )}
      </div>
    </ModalRoot>
  );
};

export default StockValidationModal;
