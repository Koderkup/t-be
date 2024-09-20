import { enableMapSet } from 'immer';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { CartStore } from '@/store/types.ts';
import { CartItemType } from '@/shared/types/types.ts';

enableMapSet();

export const useCartStore = create<CartStore>()(
  immer(set => ({
    cart: new Map<string, CartItemType>([]),
    addToCart: data =>
      set(state => {
        state.cart.set(data.id, data.item);
      }),
    increaseQuantity: (id, item) =>
      set(state => {
        state.cart.set(id, { ...item, quantity: item.quantity + 1 });
      }),
    decreaseQuantity: (id, item) =>
      set(state => {
        state.cart.set(id, { ...item, quantity: item.quantity - 1 });
      }),
    updateSize: (id, item, size) => {
      set(state => {
        state.cart.set(id, {
          ...item,
          size: {
            id: size.value,
            name: size.label,
          },
        });
      });
    },
    removeFromCart: id =>
      set(state => {
        state.cart.delete(id);
      }),
    setSelectedColor: options => set({ selectedColor: options }),
    setSelectedSize: options => set({ selectedSize: options }),
    setItemSizes: data => set({ itemSizes: data }),
    setOrderId: id => set({ orderId: id }),
    clearCart: () => set(state => state.cart.clear()),
  }))
);
