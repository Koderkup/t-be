import { immer } from 'zustand/middleware/immer';
import { create } from 'zustand';
import { enableMapSet } from 'immer';
import { MainStore } from './types.ts';
import { GridType } from '../shared/types/types.ts';

enableMapSet();

export const useMainStore = create<MainStore>()(
  immer(set => ({
    gridType: GridType.SINGLE,
    actionSheets: [],
    modal: null,
    showPaymentsPopup: false,
    promoCode: null,
    designType: null,
    isNavigationMenuOpen: false,
    setGridType: type => set({ gridType: type }),
    setActionSheets: type =>
      set(state => {
        state.actionSheets.push(type);
      }),
    closeActionSheet: type =>
      set(state => {
        if (!type) return state.actionSheets;

        const newActionSheets = state.actionSheets.filter(
          elem => elem !== type
        );
        return { ...state, actionSheets: newActionSheets };
      }),
    setModal: type => set({ modal: type }),
    setShowPaymentsPopup: isShow => set({ showPaymentsPopup: isShow }),
    setPromoCode: promoCode => set({ promoCode }),
    setDesignType: type => set({ designType: type }),
    toggleNavigationMenu: () => {
      set(state => ({ isNavigationMenuOpen: !state.isNavigationMenuOpen }));
    },
  }))
);
