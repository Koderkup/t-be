import { Size } from '@/shared/types/size.interface';
import {
  ActionSheetTypes,
  CartItemType,
  DropdownOptionType,
  GridType,
  ModalTypes,
  PromoCode,
} from '@/shared/types/types.ts';

export type MainStore = {
  gridType: GridType;
  actionSheets: ActionSheetTypes[];
  modal: ModalTypes | null;
  showPaymentsPopup: boolean;
  promoCode: PromoCode | null;
  isNavigationMenuOpen: boolean;
  designType: 'france' | 'denmark' | 'italy' | null;
  setGridType: (type: GridType) => void;
  setActionSheets: (type: ActionSheetTypes) => void;
  closeActionSheet: (type?: ActionSheetTypes) => void;
  setModal: (type: ModalTypes | null) => void;
  setShowPaymentsPopup: (show: boolean) => void;
  setPromoCode: (promoCode: PromoCode | null) => void;
  setDesignType: (type: 'france' | 'denmark' | 'italy') => void;
  toggleNavigationMenu: () => void;
};

export type CartStore = {
  cart: Map<string, CartItemType>;
  selectedColor?: DropdownOptionType | null;
  selectedSize?: DropdownOptionType | null;
  itemSizes?: Array<Size> | null;
  orderId?: string | null;
  addToCart: (data: { id: string; item: CartItemType }) => void;
  increaseQuantity: (id: string, item: CartItemType) => void;
  decreaseQuantity: (id: string, item: CartItemType) => void;
  updateSize: (
    id: string,
    item: CartItemType,
    size: DropdownOptionType
  ) => void;
  removeFromCart: (id: string) => void;
  setSelectedSize: (options: DropdownOptionType | null) => void;
  setSelectedColor: (options: DropdownOptionType | null) => void;
  setItemSizes: (data: Array<Size> | null) => void;
  setOrderId: (id: string | null) => void;
  clearCart: () => void;
};

export type TgStore = {
  userInformation?: {
    userPhoneNumber: string;
    userName: string;
  };
  setUserInformation: (data: {
    userPhoneNumber: string;
    userName: string;
  }) => void;
};
