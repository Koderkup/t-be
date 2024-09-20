import { FC } from 'react';
import { Link } from 'react-router-dom';
import { clsx as cn } from 'clsx';
import { Order } from '../../../shared/types/order.interface';
import { Typo } from '../../../components';
import { ReactComponent as LinkArrowIcon } from '../../../assets/icons/link-arrow.svg';
import OrderItemsList from './order-items-list';
import OrderInformation from './order-information';

interface OrdersListProps {
  orders: Array<Order>;
}

const OrdersList: FC<OrdersListProps> = ({ orders }) => {
  return (
    <div className="orders-list">
      {orders.map((order, idx) => {
        const totalPrice = order.totalPrice[0];
        return (
          <div
            key={order.id}
            className={cn(
              'orders-list__item',
              idx !== orders.length - 1 && 'orders-list__item--bordered'
            )}
          >
            <OrderInformation
              createdAt={order.createdAt}
              orderNumber={order.orderNumber}
              orderStatus={order.status}
            />
            <OrderItemsList items={order.items} />
            <div className="total">
              <Typo className="total__title">Total</Typo>
              <Typo className="total__price">
                {totalPrice.price} {totalPrice.currency}
              </Typo>
            </div>
            <div className="details">
              <Link className="details__link" to={`${order.id}`}>
                <Typo className="details__text">See details</Typo>
                <LinkArrowIcon />
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrdersList;
