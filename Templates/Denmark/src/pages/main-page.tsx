import { FC } from 'react';
import { MainPageLayout } from '../components';
import useContactRequestListener from '@/hooks/useContactRequestListener';

const MainPage: FC = () => {
  useContactRequestListener();

  return (
    <>
      <MainPageLayout />
    </>
  );
};

export default MainPage;
