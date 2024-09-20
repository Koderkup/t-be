import { FC } from 'react';
import { OrderItem } from '../../../shared/types/order.interface';
import {
  DenmarkOrderItemCard,
  OrderItemCard,
  OrderStatus,
  Typo,
} from '../../../components';
import { formatDate } from '../../../utils/format-date';
import OrderDetailedTotal from './order-details-total';
import { ProductPrices } from '../../../shared/types/product.interface';
import OrderDetailsRow from './order-details-row';
import HelpLink from './help-link';

interface OrderDetailsInfoProps {
  orderNumber: number;
  orderDate: Date;
  address?: string | undefined;
  payment?: string;
  status: string;
  items: Array<OrderItem>;
  totalPrice: Array<ProductPrices>;
  discountAmount: number;
  deliveryPrice: number;
  designType?: 'denmark' | 'france' | 'italy' | null;
}

const OrderDetailsInfo: FC<OrderDetailsInfoProps> = ({
  orderNumber,
  orderDate,
  address,
  payment,
  totalPrice,
  status,
  items,
  discountAmount,
  deliveryPrice,
  designType,
}) => {
  return (
    <div>
      <Typo className="order-details__number">Order #{orderNumber}</Typo>
      <div className="info">
        <OrderDetailsRow label="Order date:" value={formatDate(orderDate)} />
        <OrderDetailsRow label="Delivery address:" value={address} />
        <OrderDetailsRow label="Payment:" value={payment} />
        <div className="info__wrapper">
          <Typo className="info__status">Status:</Typo>
          <OrderStatus status={status} />
        </div>
      </div>
      <div className="info__items">
        {items.map(item =>
          designType === 'denmark' ? (
            <DenmarkOrderItemCard
              key={item.productItemId}
              quantity={item.quantity}
              productItem={item.productItem}
            />
          ) : (
            <OrderItemCard
              key={item.productItemId}
              type="order-details"
              quantity={item.quantity}
              productItem={item.productItem}
            />
          )
        )}
      </div>
      <OrderDetailedTotal
        subTotal={totalPrice[0].price}
        currency={totalPrice[0].currency}
        deliveryPrice={deliveryPrice}
        discountAmount={discountAmount}
      />
      <HelpLink />
    </div>
  );
};

export default OrderDetailsInfo;
