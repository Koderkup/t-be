import { FC } from 'react';
import { PriceDetails } from '../../../components';

interface OrderDetailsTotalProps {
  subTotal: number;
  currency: string;
  discountAmount: number;
  deliveryPrice: number;
}

const OrderDetailsTotal: FC<OrderDetailsTotalProps> = ({
  subTotal,
  currency,
  discountAmount,
  deliveryPrice,
}) => {
  return (
    <div className="info__total">
      <PriceDetails
        label="Subtotal"
        currency={currency}
        price={subTotal}
        isTotal={false}
      />
      <PriceDetails
        label="Discount"
        currency={currency}
        price={discountAmount}
        isTotal={false}
      />
      <PriceDetails
        label="Delivery"
        currency={currency}
        price={deliveryPrice}
        isTotal={false}
      />
      <PriceDetails
        label="Total"
        currency={currency}
        price={subTotal}
        isTotal
      />
    </div>
  );
};

export default OrderDetailsTotal;
