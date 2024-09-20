import { FC, Fragment } from 'react';
import { ActionSheetTypes, ModalTypes } from '../shared/types/types.ts';
import {
  CartActionSheet,
  PaymentsActionSheet,
  SizeActionSheet,
  StockValidationModal,
  UseBonuseModal,
} from '../components';
import { useMainStore } from '../store';

const ModalProvider: FC = () => {
  const { actionSheets, modal } = useMainStore();

  if (!actionSheets.length) {
    return null;
  }

  return (
    <>
      {actionSheets.map(elem => (
        <Fragment key={elem}>
          {
            {
              [ActionSheetTypes.CART]: <CartActionSheet />,
              [ActionSheetTypes.SIZE]: <SizeActionSheet />,
              [ActionSheetTypes.PAYMENT]: <PaymentsActionSheet />,
            }[elem]
          }
        </Fragment>
      ))}
      {modal === ModalTypes.STOCK_VALIDATION && <StockValidationModal />}
      {modal === ModalTypes.USE_BONUSE && <UseBonuseModal />}
    </>
  );
};

export default ModalProvider;
