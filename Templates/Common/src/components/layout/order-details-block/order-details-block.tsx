import { FC } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useOrdersAPI } from '../../../hooks/useOrdersAPI.ts';
import OrderDetailsInfo from './order-details-info.tsx';
import { useMainStore } from '../../../store/main-store.ts';

type Props = {
  telegramId: string;
};

const OrderDetailsBlock: FC<Props> = ({ telegramId }) => {
  const params = useParams();
  const [designType] = useMainStore(state => [state.designType]);
  const {
    order: { data, isError },
  } = useOrdersAPI(telegramId || '', params.orderId);

  if (isError) return <Navigate to="/404" replace />;

  if (!data) return null;

  return (
    <div className="order-details">
      <OrderDetailsInfo
        totalPrice={data.totalPrice}
        orderNumber={data.orderNumber}
        orderDate={data.createdAt}
        address={data.address}
        payment={data.payment}
        status={data.status}
        items={data.items}
        discountAmount={data.discountAmount}
        deliveryPrice={data.deliveryPrice}
        designType={designType}
      />
    </div>
  );
};

export default OrderDetailsBlock;
