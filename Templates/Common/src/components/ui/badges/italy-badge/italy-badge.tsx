import { FC, ReactNode } from 'react';
import clsx from 'clsx';
import { Typo } from '../../..';
import { ProductCardType } from '../../product-card/types';

type Props = {
  featuredText?: string;
  icon?: ReactNode;
  cardType: ProductCardType;
};

const ItalyFeatureBadge: FC<Props> = ({ featuredText, icon, cardType }) => {
  return (
    <div
      className={clsx(
        'badge',
        featuredText === 'NEW' && 'badge-new',
        cardType === ProductCardType.COLUMN && 'badge--column'
      )}
    >
      {icon}
      {featuredText && <Typo className="badge__text">{featuredText}</Typo>}
    </div>
  );
};

export default ItalyFeatureBadge;
