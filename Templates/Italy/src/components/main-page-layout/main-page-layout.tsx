import { FC, useEffect } from 'react';
import {
  GridControls,
  ItalyPromoBlock,
  Navigation,
  ProductsCardList,
  useMainStore,
  useNavigateBack,
  useProductsAPI,
} from 'common';
import { controls } from 'src/shared/data.tsx';
import { useTelegram } from '@/hooks/useTelegram.ts';
import { BackButton } from '@twa-dev/sdk/react';

const MainPageLayout: FC = () => {
  const { tg } = useTelegram();
  const {
    products: { data },
  } = useProductsAPI();
  const { actionSheets } = useMainStore();
  const handleBackClick = useNavigateBack();

  useEffect(() => {
    if (actionSheets.length) {
      tg.BackButton.show();
    }
    return () => {
      tg.BackButton.hide();
    };
  }, [actionSheets.length, tg]);

  return (
    <>
      {!!actionSheets.length && <BackButton onClick={handleBackClick} />}
      <ItalyPromoBlock />

      <div className="px-4 pt-4 pb-6">
        <Navigation />
        <GridControls data={controls} />
        <ProductsCardList designType="italy" data={data || []} />
      </div>
    </>
  );
};

export default MainPageLayout;
