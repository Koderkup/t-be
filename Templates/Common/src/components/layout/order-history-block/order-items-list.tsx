import { FC } from 'react';
import { OrderItem as OrderItemInterface } from '../../../shared/types/order.interface';
import { DenmarkOrderItemCard, OrderItemCard } from '../../../components';
import { useMainStore } from '../../../store';

interface OrderItemsListProps {
  items: Array<OrderItemInterface>;
}

const OrderItemsList: FC<OrderItemsListProps> = ({ items }) => {
  const [designType] = useMainStore(state => [state.designType]);

  return (
    <div className="orders-list__items">
      {items.map(item =>
        designType === 'denmark' ? (
          <DenmarkOrderItemCard
            key={item.productItemId}
            quantity={item.quantity}
            productItem={item.productItem}
          />
        ) : (
          <OrderItemCard
            type="order-history"
            key={item.productItemId}
            quantity={item.quantity}
            productItem={item.productItem}
          />
        )
      )}
    </div>
  );
};

export default OrderItemsList;
