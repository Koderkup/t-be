import { FC } from 'react';
import { clsx as cn } from 'clsx';
import { ProductPrices } from '../../../shared/types/product.interface';
import { Typo } from '../../../components';

export interface OrderItemProps {
  type: 'order-details' | 'order-history';
  quantity: number;
  productItem: {
    name: string;
    prices: Array<ProductPrices>;
    mediasUrl: Array<string>;
  };
}

const OrderItemCard: FC<OrderItemProps> = ({ type, quantity, productItem }) => {
  return (
    <div className="order-item-card">
      <div
        className={cn(
          'order-item-card__left-side',
          type === 'order-history' && 'order-item-card__left-side--history',
          type === 'order-details' && 'order-item-card__left-side--details'
        )}
      >
        <img
          className="order-item-card__left-side--image"
          src={
            productItem.mediasUrl[0] || import.meta.env.VITE_CLOTHES_NO_IMAGE
          }
          alt={productItem.name}
        />
      </div>

      <div
        className={cn(
          'order-item-card__right-side',
          type === 'order-details' && 'order-item-card__right-side--details'
        )}
      >
        <div className="info">
          <Typo className="info__name">{productItem.name}</Typo>
          <div className="info__wrapper">
            <div className="info__inner">
              <div className="info__color">
                <span
                  className={cn('info__color--dot')}
                  style={{ backgroundColor: '#000' }}
                />
              </div>
              <Typo className="info__color--name">Black</Typo>
            </div>

            <Typo className="info__text">/</Typo>
            <Typo className="info__text info__text__size">XS-S (32-34)</Typo>
            <Typo className="info__text info__text__size">/</Typo>
            <Typo className="info__text">Quantity: {quantity}</Typo>
          </div>
        </div>
        <Typo className="info__prices">
          {productItem.prices[0].price} {productItem.prices[0].currency}
        </Typo>
      </div>
    </div>
  );
};

export default OrderItemCard;
