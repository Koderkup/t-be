import { FC, useEffect } from 'react';
import ActionSheetRoot from '../action-sheet-root.tsx';
import { Button, Cart, HomeIndicator, Typo } from '../../../../components';
import { usePaymentAPI } from '../../../../hooks/usePaymentAPI.ts';
import { useCart, useNavigateBack } from '../../../../hooks';
import { useCartStore } from '../../../../store';

const CartActionSheet: FC = () => {
  const { cart, getCartTotal, isCartEmpty } = useCart();
  const { updateOrder } = usePaymentAPI();
  const orderId = useCartStore(state => state.orderId);
  const closeActionSheet = useNavigateBack();

  useEffect(() => {
    if (isCartEmpty) {
      closeActionSheet();
    }
  }, [isCartEmpty]);

  const handleProceed = () => {
    if (orderId) {
      updateOrder.mutate({
        id: orderId,
        totalPrice: [
          {
            price: Number(getCartTotal().replace(',', '.')),
            currency: 'USD',
          },
        ],
        items: Array.from(cart.values()).map(elem => ({
          productItemId: elem.id,
          quantity: elem.quantity,
          productItem: {
            prices: [
              {
                price: Number((elem.price ?? 0).toString().replace(',', '.')),
                currency: elem.currency,
              },
            ],
            name: elem.name,
            mediasUrl: [elem.image],
          },
          prices: [
            {
              price: Number((elem.price ?? 0).toString().replace(',', '.')),
              currency: elem.currency,
            },
          ],
        })),
      });
    }
  };

  return (
    <ActionSheetRoot>
      <div className="cart">
        <Cart />

        <div className="cart__button">
          <Button variant="secondary" size="large" onClick={handleProceed}>
            <Typo className="cart__text">Proceed</Typo>
          </Button>

          <HomeIndicator />
        </div>
      </div>
    </ActionSheetRoot>
  );
};

export default CartActionSheet;
