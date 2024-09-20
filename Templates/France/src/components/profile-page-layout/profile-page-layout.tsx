import { FC, useEffect } from 'react';
import { useTelegram } from '@/hooks/useTelegram.ts';
import { BackButton } from '@twa-dev/sdk/react';
import { ProfileInformationBlock, useBackFromPage } from 'common';

const ProfilePageLayout: FC = () => {
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

      <ProfileInformationBlock telegramId={user?.id.toString() || ''} />
    </div>
  );
};

export default ProfilePageLayout;
