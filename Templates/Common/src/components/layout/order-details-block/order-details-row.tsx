import { FC } from 'react';
import { Typo } from '../../../components';

interface OrderDetailsRowProps {
  label: string;
  value?: string;
}

const OrderDetailsRow: FC<OrderDetailsRowProps> = ({ label, value }) => {
  return (
    <Typo className="info__row">
      {label}
      <span className="info__value">{value}</span>
    </Typo>
  );
};

export default OrderDetailsRow;
