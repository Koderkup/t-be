import { FC, useEffect } from 'react';
import { useTelegram } from '@/hooks/useTelegram.ts';
import { BackButton } from '@twa-dev/sdk/react';
import { ProfileInformationBlock, useBackFromPage } from 'common';

const ProfilePageLayout: FC = () => {
  const { tg } = useTelegram();
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

      <ProfileInformationBlock telegramId="" />
    </div>
  );
};

export default ProfilePageLayout;
