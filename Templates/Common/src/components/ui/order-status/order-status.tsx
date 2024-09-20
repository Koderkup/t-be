import { FC, useMemo } from 'react';
import { Typo } from '../../../components';
import { STATUS_VARIANTS } from './data';

interface OrderStatusProps {
  status: string;
}

const OrderStatus: FC<OrderStatusProps> = ({ status }) => {
  const statusInfo = useMemo(() => {
    const statusVariant = STATUS_VARIANTS.find(
      variant => variant.text === status
    );
    if (statusVariant) {
      const Icon = statusVariant.icon;
      return {
        icon: <Icon />,
        text: statusVariant.text,
      };
    }
    return null;
  }, [status]);

  return (
    <div className="order-status">
      <span className="status-icon">{statusInfo?.icon}</span>
      <Typo className="order-status__text">{statusInfo?.text}</Typo>
    </div>
  );
};

export default OrderStatus;
