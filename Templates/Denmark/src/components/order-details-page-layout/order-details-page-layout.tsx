import { FC, useEffect } from 'react';
import { BackButton } from '@twa-dev/sdk/react';
import { useTelegram } from '@/hooks/useTelegram.ts';
import { OrderDetailsBlock, RoutesPaths, useBackFromPage } from 'common';

const OrderDetailsPageLayout: FC = () => {
  const { tg, user } = useTelegram();
  const handleBack = useBackFromPage(RoutesPaths.ORDER_HISTORY);

  useEffect(() => {
    tg.BackButton.show();
    return () => {
      tg.BackButton.hide();
    };
  }, [tg.BackButton]);

  return (
    <div>
      <BackButton onClick={handleBack} />
      <OrderDetailsBlock telegramId={user?.id.toString() || ''} />
    </div>
  );
};

export default OrderDetailsPageLayout;
