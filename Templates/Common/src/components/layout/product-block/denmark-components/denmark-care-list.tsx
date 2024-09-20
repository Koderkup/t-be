import { FC, ReactNode, useState } from 'react';
import clsx from 'clsx';
import Typo from '../../../ui/typo/typo';
import { ReactComponent as ListArrow } from '../../../../assets/icons/list-arrow.svg';

interface NolaCareListProps {
  children: ReactNode;
  heading: string;
}

const DenmarkCareList: FC<NolaCareListProps> = ({ children, heading }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={clsx('product-info__item--wrapper', {
        'product-info__item--wrapper-active': isOpen,
      })}
    >
      <div className="product-info__item--block">
        <Typo className="product-info__item--text">{heading}</Typo>
        <button
          aria-label="Open"
          className={clsx('product-info__item--button', {
            'product-info__item--button-active': isOpen,
          })}
          onClick={() => setIsOpen(prev => !prev)}
          type="button"
        >
          <ListArrow />
        </button>
      </div>
      {children}
    </div>
  );
};

export default DenmarkCareList;
