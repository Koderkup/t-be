import { FC } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import WebApp from '@twa-dev/sdk';
import {
  Button,
  HomeIndicator,
  ProductAmountController,
  Typo,
} from '../../../../components';
import { useCart } from '../../../../hooks/useCart.ts';
import { useCartStore, useMainStore } from '../../../../store';
import { ReactComponent as AddIcon } from '../../../../assets/icons/add-icon.svg';
import { subtractPercentage } from '../../../../utils/subtract-percentage.ts';
import { usePaymentAPI, useProductsAPI, useShopId } from '../../../../hooks';
import { OrderStatuses } from '../../../../shared';
import { productPriceParse } from '../../../../utils/product-price-parse.ts';

const AddToCardButton: FC = () => {
  const params = useParams<{ productId: string }>();
  const {
    product: { data },
  } = useProductsAPI(params?.productId);
  const telegram = WebApp;
  const [color, size, addToCart, itemSizes] = useCartStore(state => [
    state.selectedColor,
    state.selectedSize,
    state.addToCart,
    state.itemSizes,
  ]);
  const [designType] = useMainStore(state => [state.designType]);
  const shopId = useShopId();
  const { getProductById } = useCart();
  const uniqueId = `${params.productId}-${color?.color}-${size?.value}`;
  const cartItem = getProductById(uniqueId);
  const { createOrder } = usePaymentAPI();
  const firstPrice = productPriceParse(data?.prices || []);
  const productFinalPrice = data?.discount
    ? subtractPercentage(firstPrice?.price, data?.discount)
    : firstPrice?.price;

  const handleAddToCart = () => {
    if (!cartItem?.quantity && data) {
      addToCart({
        id: uniqueId,
        item: {
          id: params.productId || '',
          uniqueId,
          color: {
            id: color?.value || '',
            hexCode: color?.color || '',
            name: color?.label || '',
          },
          size: {
            id: size?.value || '',
            name: size?.label || '',
          },
          sizes: itemSizes || [],
          price: productFinalPrice,
          currency: firstPrice.currency,
          quantity: 1,
          name: data?.name,
          image:
            data?.mediasUrl?.at(0) || import.meta.env.VITE_CLOTHES_NO_IMAGE,
        },
      });

      createOrder.mutate({
        shopId: shopId || '',
        customerId: telegram.initDataUnsafe.user?.id.toString() || '',
        status: OrderStatuses.Pending,
        currency: firstPrice.currency,
        totalPrice: [
          {
            price: Number(productFinalPrice?.toString().replace(',', '.')),
            currency: firstPrice.currency,
          },
        ],
        items: [
          {
            productItemId: params.productId as string,
            quantity: 1,
            colorId: color?.value.toString(),
            sizeId: size?.value.toString(),
            prices: [
              {
                price: Number(firstPrice.price.toString().replace(',', '.')),
                currency: firstPrice.currency,
              },
            ],
          },
        ],
      });
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: 'auto' }}
        exit={{ height: '0' }}
        className="add-to-cart"
      >
        <Button
          variant="secondary"
          size="large"
          className="add-to-cart__button"
          onClick={handleAddToCart}
          disabled={
            designType !== 'italy'
              ? !color?.value || !size?.value
              : !color?.value
          }
        >
          <Typo className="add-to-cart__text">
            {cartItem?.quantity ? (
              <ProductAmountController uniqueId={uniqueId} footnote="In cart" />
            ) : (
              <div className="add-to-cart__text__block">
                {designType === 'italy' && <AddIcon />}
                Add to cart
              </div>
            )}
          </Typo>
        </Button>

        <HomeIndicator />
      </motion.div>
    </AnimatePresence>
  );
};

export default AddToCardButton;
