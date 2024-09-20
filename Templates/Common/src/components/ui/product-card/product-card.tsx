import { FC, ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { clsx as cn } from 'clsx';
import { Product } from '../../../shared/types/product.interface.ts';
import { Paths } from '../../../shared/types/constants.ts';
import { FeatureBadge, Typo } from '../../../components';
import { useMainStore } from '../../../store/main-store.ts';
import { GridType } from '../../../shared/types/types.ts';
import { ProductCardType } from './types.ts';
import { subtractPercentage } from '../../../utils/subtract-percentage.ts';
import { productPriceParse } from '../../../utils/product-price-parse.ts';

type Props = Partial<Product> & {
  cardType: ProductCardType;
  className?: string;
  featuredIcon?: ReactNode;
  mockUrl?: string;
};

const ProductCard: FC<Props> = ({
  id,
  cardType,
  mockUrl,
  prices,
  name,
  mediasUrl,
  className,
  discount,
  isFeatured,
  featuredText,
  featuredIcon,
}) => {
  const location = useLocation();
  const gridType = useMainStore(state => state.gridType);
  const firstPrice = productPriceParse(prices || []);
  const productFinalPrice = discount
    ? subtractPercentage(firstPrice?.price, discount)
    : firstPrice?.price;

  return (
    <Link
      to={`${Paths.PRODUCT}/${mockUrl || id}`}
      state={{ prevLocation: location.pathname }}
      id={id}
      className={cn(
        'card',
        {
          [ProductCardType.FULL]: 'card--full',
          [ProductCardType.COLUMN]: 'card--column',
          [ProductCardType.SMALL]: 'card--small',
        }[cardType],
        className
      )}
    >
      <img
        className={cn(
          'card__image',
          {
            [ProductCardType.FULL]: 'card__image--full',
            [ProductCardType.COLUMN]: 'card__image--column',
            [ProductCardType.SMALL]: 'card__image--small',
          }[cardType]
        )}
        src={
          (mediasUrl && mediasUrl[0]) ?? import.meta.env.VITE_CLOTHES_NO_IMAGE
        }
        alt={name}
      />

      {gridType !== GridType.MULTIPLE && (
        <div className="card__info">
          <div className={cn('card__name')}>
            <Typo className="card__text">{name}</Typo>
          </div>

          <div className="card__cost">
            <Typo className="card__price">
              {productFinalPrice}
              <span className="ml-1">{firstPrice?.currency}</span>
            </Typo>

            {!!discount && (
              <Typo className="card__discount">{firstPrice?.price}</Typo>
            )}
          </div>

          {isFeatured && (
            <FeatureBadge icon={featuredIcon} featuredText={featuredText} />
          )}
        </div>
      )}
    </Link>
  );
};

export default ProductCard;
