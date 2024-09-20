import { FC } from 'react';
import { useOrdersAPI } from '../../../hooks/useOrdersAPI.ts';
import { Typo } from '../../../components';
import OrdersList from './orders-list.tsx';

type Props = {
  telegramId: string;
};

const OrderHistoryBlock: FC<Props> = ({ telegramId }) => {
  const {
    orders: { data },
  } = useOrdersAPI(telegramId || '');

  return (
    <div>
      <div className="order-history">
        <Typo className="order-history__title">Order history</Typo>
        {data && <OrdersList orders={data} />}
      </div>
    </div>
  );
};
export default OrderHistoryBlock;
