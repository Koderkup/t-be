import { FC, useEffect } from 'react';
import { useTelegram } from '@/hooks/useTelegram.ts';
import { BackButton } from '@twa-dev/sdk/react';
import { InfoBlock, useBackFromPage } from 'common';

const InfoPageLayout: FC = () => {
  const { tg } = useTelegram();
  const handleBack = useBackFromPage();

  const handleLocationClick = (location: string) => {
    tg.openLink(`http://maps.google.com/?q=${location}`);
  };

  useEffect(() => {
    tg.BackButton.show();
    return () => {
      tg.BackButton.hide();
    };
  }, [tg.BackButton]);

  return (
    <div>
      <BackButton onClick={handleBack} />

      <InfoBlock onButtonClick={handleLocationClick} />
    </div>
  );
};

export default InfoPageLayout;
