import { DropdownOptionType } from '../shared/types/types';
import { useCartStore } from '../store';

export const useCart = () => {
  const [cart, increaseQuantity, decreaseQuantity, removeFromCart, updateSize] =
    useCartStore(state => [
      state.cart,
      state.increaseQuantity,
      state.decreaseQuantity,
      state.removeFromCart,
      state.updateSize,
    ]);

  const isCartEmpty = cart?.size === 0;

  const getProductById = (id: string) => {
    return cart?.get(id);
  };

  const increaseAmount = (id: string) => {
    const item = cart?.get(id);

    if (!item) {
      return;
    }

    increaseQuantity(id, item);
  };

  const updateItemSize = (id: string, size: DropdownOptionType) => {
    const item = cart?.get(id);

    if (!item) {
      return;
    }

    updateSize(id, item, size);
  };

  const decreaseAmount = (id: string) => {
    const item = cart?.get(id);

    if (!item || item.quantity === 1) {
      return;
    }

    decreaseQuantity(id, item);
  };

  const removeItem = (id: string) => {
    if (id) {
      removeFromCart(id);
    }
  };

  const getCartTotal = () => {
    let total = 0;
    if (!isCartEmpty) {
      cart.forEach(item => {
        const price = Number(item.price?.toString().replace(',', '.'));
        total += Number(price) * item.quantity;
      });
    }
    return total.toFixed(2).toString().replace('.', ',');
  };

  const subtotalPrice = () => {
    let total = 0;
    if (!isCartEmpty) {
      cart.forEach(item => {
        const price = Number(item.price?.toString().replace(',', '.'));
        total += Number(price) * item.quantity;
      });
    }
    return total;
  };

  return {
    cart,
    isCartEmpty,
    itemsCount: cart?.size,
    getProductById,
    increaseAmount,
    decreaseAmount,
    removeItem,
    getCartTotal,
    updateItemSize,
    subtotalPrice,
  };
};
