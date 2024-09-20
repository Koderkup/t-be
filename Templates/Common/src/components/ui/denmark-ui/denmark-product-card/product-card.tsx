import { FC, ReactNode, useCallback, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import clsx, { clsx as cn } from 'clsx';
import { Product } from '../../../../shared/types/product.interface.ts';
import { Paths } from '../../../../shared/types/constants.ts';
import { Typo } from '../../../index.ts';
import { useMainStore } from '../../../../store/main-store.ts';
import { GridType } from '../../../../shared/types/types.ts';
import { ProductCardType } from './types.ts';
import { subtractPercentage } from '../../../../utils/subtract-percentage.ts';
import { dropdownOptionsMap } from '../../../layout/product-block/helpers.ts';
import { productPriceParse } from '../../../../utils/product-price-parse.ts';
import DenmarkSelect from '../denmark-select/denmark-select.tsx';
import DenmarkBadge from '../../badges/denamark-badge/denmark-badge.tsx';

type Props = Partial<Product> & {
  cardType: ProductCardType;
  className?: string;
  featuredIcon?: ReactNode;
};

const DenmarkProductCard: FC<Props> = ({
  id,
  cardType,
  prices,
  name,
  mediasUrl,
  className,
  discount,
  isFeatured,
  featuredText,
  featuredIcon,
  colors,
}) => {
  const [activeColor, setActiveColor] = useState('');
  const location = useLocation();
  const gridType = useMainStore(state => state.gridType);
  const firstPrice = productPriceParse(prices || []);
  const colorsOptions = dropdownOptionsMap(colors || []);

  const handleActiveColor = useCallback((id: string) => {
    setActiveColor(id);
  }, []);

  return (
    <>
      <Link
        to={`${Paths.PRODUCT}/${id}`}
        state={{
          prevLocation: location.pathname,
          activeColor: activeColor || colorsOptions[0].value,
        }}
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
        <div className="card__image__wrapper">
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
              (mediasUrl && mediasUrl[0]) ??
              import.meta.env.VITE_CLOTHES_NO_IMAGE
            }
            alt={name}
          />

          {isFeatured && gridType !== GridType.MULTIPLE && (
            <DenmarkBadge
              gridType={gridType}
              icon={featuredIcon}
              featuredText={featuredText}
            />
          )}
        </div>

        {gridType !== GridType.MULTIPLE && (
          <div
            className={cn('card__info', {
              'card__info--column': ProductCardType.COLUMN === cardType,
            })}
          >
            <div className={cn('card__name')}>
              <Typo className="card__text">{name}</Typo>
            </div>

            <div className="card__cost">
              <Typo
                className={clsx('card__price', {
                  card__price_unactive: !!discount,
                })}
              >
                {firstPrice?.price}
                <span className="ml-1">{firstPrice?.currency}</span>
              </Typo>

              {discount !== 0 && (
                <Typo className="card__discount">
                  {subtractPercentage(firstPrice?.price, discount)}
                  <span className="ml-1">{firstPrice?.currency}</span>
                </Typo>
              )}
            </div>
          </div>
        )}
      </Link>
      {gridType === GridType.SINGLE && (
        <DenmarkSelect
          colorFn={handleActiveColor}
          type="color"
          options={colorsOptions}
          pageType="main"
        />
      )}
    </>
  );
};

export default DenmarkProductCard;
