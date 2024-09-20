import { FC } from 'react';
import { clsx as cn } from 'clsx';
import { ProductPrices } from '../../../../shared/types/product.interface';
import { Typo } from '../../../../components';

export interface DenmarkOrderItemProps {
  quantity: number;
  productItem: {
    name: string;
    prices: Array<ProductPrices>;
    mediasUrl: Array<string>;
  };
}

const DenmarkOrderItemCard: FC<DenmarkOrderItemProps> = ({
  quantity,
  productItem,
}) => {
  return (
    <div className="order-item-card">
      <div
        className={cn(
          'order-item-card__left-side order-item-card__left-side--history '
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

      <div className={cn('order-item-card__right-side')}>
        <div className="info">
          <Typo className="info__name">{productItem.name}</Typo>
          <Typo className="info__prices">
            {productItem.prices[0].price} {productItem.prices[0].currency}
          </Typo>
        </div>
        <div className="info__wrapper">
          <Typo className="info__wrapper__text">Size: XS</Typo>
          <Typo className="info__wrapper__text">Quantity: {quantity}</Typo>
        </div>
      </div>
    </div>
  );
};

export default DenmarkOrderItemCard;
