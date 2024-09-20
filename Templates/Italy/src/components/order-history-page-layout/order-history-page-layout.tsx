import { FC, useEffect } from 'react';
import { BackButton } from '@twa-dev/sdk/react';
import { useTelegram } from '@/hooks/useTelegram.ts';
import { OrderHistoryBlock, useBackFromPage } from 'common';

const OrderHistoryPageLayout: FC = () => {
  const { tg, user } = useTelegram();
  const handleBack = useBackFromPage();

  useEffect(() => {
    tg.BackButton.show();
    return () => {
      tg.BackButton.hide();
    };
  }, [tg.BackButton]);

  return (
    <div>
      <BackButton onClick={handleBack} />
      <OrderHistoryBlock telegramId={user?.id.toString() || ''} />
    </div>
  );
};

export default OrderHistoryPageLayout;
