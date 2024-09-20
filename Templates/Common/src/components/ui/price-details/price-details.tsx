import { FC } from 'react';
import { clsx as cn } from 'clsx';
import { Typo } from '../../../components';

interface PriceDetailsProps {
  label: string;
  currency: string;
  price: number;
  isTotal: boolean;
}

const PriceDetails: FC<PriceDetailsProps> = ({
  price,
  currency,
  label,
  isTotal,
}) => {
  return (
    <div className={cn('price-details', isTotal && 'price-details--is-total')}>
      <Typo
        className={cn(
          'price-details__label',
          isTotal && 'price-details__label--is-total'
        )}
      >
        {label}
      </Typo>
      <Typo
        className={cn(
          'price-details__price',
          isTotal && 'price-details__price--is-total'
        )}
      >
        {price} {currency}
      </Typo>
    </div>
  );
};

export default PriceDetails;
