import { FC, useEffect } from 'react';
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import { CartControls, Footer, NavigationMenu } from '../../../components';
import { ModalProvider } from '../../../providers';
import { useCustomersAPI, useShopId, useTelegram } from '../../../hooks';
import { Paths } from '../../../shared/types/constants';
import { useMainStore } from '../../../store';

interface PageLayoutProps {
  designType?: 'denmark' | 'france' | 'italy';
}

const PageLayout: FC<PageLayoutProps> = ({ designType }) => {
  const { user } = useTelegram();
  const location = useLocation();
  const shopId = useShopId();
  const { createCustomer } = useCustomersAPI();
  const [setDesignType] = useMainStore(state => [state.setDesignType]);

  const isNonCartPages =
    location.pathname.includes(Paths.ORDER_HISTORY) ||
    location.pathname.includes(Paths.INFO) ||
    location.pathname.includes(Paths.PROFILE_INFORMATION);

  useEffect(() => {
    if (shopId) {
      createCustomer.mutate({
        shopId,
        telegramID: user?.id.toString() || '',
        lastLogin: new Date(),
      });
    }

    setDesignType(designType || 'france');
  }, [shopId]);

  return (
    <>
      <NavigationMenu />
      <main>
        <Outlet />
      </main>
      <Footer />
      {!isNonCartPages && <CartControls />}
      <ModalProvider />
      <ScrollRestoration />
    </>
  );
};

export default PageLayout;
