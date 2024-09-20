import { FC } from 'react';
import clsx from 'clsx';
import Typo from '../../typo/typo';
import { subtractPercentage } from '../../../../utils/subtract-percentage';

interface DenmarkDiscountProps {
  price: number;
  currency: string;
  discount: number;
}

const DenmarkDiscount: FC<DenmarkDiscountProps> = ({
  price,
  discount,
  currency,
}) => {
  return (
    <div className="nola__cost">
      <Typo
        className={clsx('nola_price', {
          nola_price_unactive: !!discount,
        })}
      >
        {price}
        <span className="ml-1">{currency}</span>
      </Typo>

      {!!discount && (
        <Typo className="nola__discount">
          {subtractPercentage(price, discount)}
          <span className="ml-1">{currency}</span>
        </Typo>
      )}
    </div>
  );
};

export default DenmarkDiscount;
