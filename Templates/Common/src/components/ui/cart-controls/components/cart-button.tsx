import { FC } from 'react';
import { clsx as cn } from 'clsx';
import { useLocation } from 'react-router-dom';
import { HomeIndicator, Typo } from '../../../../components';
import { ReactComponent as Bag } from '../../../../assets/icons/shopping-bag-2-line.svg';
import { useMainStore } from '../../../../store';
import { ActionSheetTypes } from '../../../../shared/types/types.ts';

type Props = {
  isProductPage?: boolean;
  itemsCount: number;
};

const CartButton: FC<Props> = ({ isProductPage, itemsCount }) => {
  const setActionSheets = useMainStore(state => state.setActionSheets);
  const { pathname } = useLocation();

  const isMainPage = pathname === '/';

  return (
    <div
      className={cn(
        'cart-controls__button',
        isProductPage && 'cart-controls__button--is-product'
      )}
    >
      <button
        onClick={() => setActionSheets(ActionSheetTypes.CART)}
        className={cn(
          'cart-controls__wrapper',
          isMainPage && 'cart-controls__main-wrapper'
        )}
      >
        <Bag />
        <Typo className="cart-controls__text">{`Cart (${itemsCount})`}</Typo>
      </button>

      {!isProductPage && <HomeIndicator />}
    </div>
  );
};

export default CartButton;
