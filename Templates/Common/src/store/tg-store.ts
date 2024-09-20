import { create } from 'zustand';

import { persist } from 'zustand/middleware';
import { TgStore } from './types';
import { phoneNumberFormatCheck } from './helpers';

export const useTgStore = create<TgStore>()(
  persist(
    set => ({
      setUserInformation: data =>
        set({
          userInformation: {
            userName: data.userName,
            userPhoneNumber: phoneNumberFormatCheck(data.userPhoneNumber),
          },
        }),
    }),
    {
      name: 'tg-storage',
    }
  )
);
