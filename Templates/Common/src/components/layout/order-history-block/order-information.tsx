import { FC } from 'react';
import { formatDate } from '../../../utils/format-date';
import { OrderStatus, Typo } from '../../../components';

interface OrderInformationProps {
  createdAt: Date;
  orderNumber: number;
  orderStatus: string;
}

const OrderInformation: FC<OrderInformationProps> = ({
  createdAt,
  orderNumber,
  orderStatus,
}) => {
  return (
    <div className="information">
      <Typo className="information__date">{formatDate(createdAt)}</Typo>
      <div className="information__item">
        <p className="information__number">#{orderNumber}</p>
        <OrderStatus status={orderStatus} />
      </div>
    </div>
  );
};

export default OrderInformation;
