import { useEffect } from 'react';
import { useTelegram } from './useTelegram';
import { useTgStore } from 'common';

const useContactRequestListener = () => {
  const { tg, user } = useTelegram();
  const { setUserInformation, userInformation } = useTgStore();

  useEffect(() => {
    const handleContactRequested = (event: any) => {
      switch (event.status) {
        case 'sent':
          setUserInformation({
            userName: user?.first_name || '',
            userPhoneNumber: event.responseUnsafe.contact.phone_number,
          });
          break;
        case 'cancelled':
          tg.close();
          break;
        default:
          break;
      }
    };

    if (!userInformation?.userPhoneNumber) {
      tg.onEvent('contactRequested', handleContactRequested);
    }

    return () => {
      if (!userInformation?.userPhoneNumber) {
        tg.offEvent('contactRequested', handleContactRequested);
      }
    };
  }, [
    setUserInformation,
    tg,
    user?.first_name,
    userInformation?.userPhoneNumber,
  ]);
};

export default useContactRequestListener;
