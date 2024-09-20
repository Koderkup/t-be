import { FC } from 'react';
import { BackButton } from '@twa-dev/sdk/react';
import { StripeCheckoutBlock, useBackFromCheckoutPage } from 'common';

const StripeCheckoutPageLayout: FC = () => {
  const handleNavigateBack = useBackFromCheckoutPage();
  return (
    <>
      <BackButton onClick={handleNavigateBack} />
      <StripeCheckoutBlock />
    </>
  );
};

export default StripeCheckoutPageLayout;
