import { FC, PropsWithChildren } from 'react';
import { clsx as cn } from 'clsx';
import { Typo } from '../../../components';

type Props = PropsWithChildren & {
  heading: string;
  className?: string;
};
const ProductInfoItem: FC<Props> = ({ heading, className, children }) => {
  return (
    <div className={cn('product-info__item', className)}>
      <Typo className="product-info__item--text">{heading}</Typo>

      {children}
    </div>
  );
};

export default ProductInfoItem;
