import { FC } from 'react';
import useContactRequestListener from '@/hooks/useContactRequestListener';
import { NavigatePage } from 'common';

const Navigation: FC = () => {
  useContactRequestListener();

  return (
    <>
      <NavigatePage />
    </>
  );
};

export default Navigation;
