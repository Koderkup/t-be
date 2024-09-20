import { FC, useEffect } from 'react';
import { useTelegram } from '@/hooks/useTelegram.ts';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  CategoryPageHeading,
  GridControls,
  ProductsCardList,
  RoutesPaths,
  useCategoriesAPI,
  useMainStore,
  useNavigateBack,
} from 'common';
import { BackButton } from '@twa-dev/sdk/react';
import { controls } from '@/shared/data.tsx';

const CategoryPageLayout: FC = () => {
  const { tg } = useTelegram();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { category } = useCategoriesAPI(state.categoryId);
  const { actionSheets } = useMainStore();
  const navigateBack = useNavigateBack();

  useEffect(() => {
    tg.BackButton.show();
    return () => {
      tg.BackButton.hide();
    };
  }, [actionSheets.length, tg]);

  const handleBackClick = () => {
    if (actionSheets.length) {
      navigateBack();
    } else {
      navigate(RoutesPaths.HOME);
    }
  };

  return (
    <>
      <div className="category-page">
        <BackButton onClick={handleBackClick} />
        <CategoryPageHeading
          name={category.data?.name}
          description={category.data?.description}
        />
        <GridControls data={controls} />
        <ProductsCardList data={category.data?.products || []} />
      </div>
    </>
  );
};

export default CategoryPageLayout;
