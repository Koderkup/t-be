import { FC, PropsWithChildren, ReactNode } from 'react';
import { clsx as cn } from 'clsx';

type Props = PropsWithChildren<{
  icon: ReactNode;
  onClick?: () => void;
  selected: boolean;
}>;

const PaymentItem: FC<Props> = ({ onClick, children, icon, selected }) => {
  return (
    <button type="button" onClick={onClick} className="payment__item">
      <div className="payment__icon">
        <div className="payment__icon--size">{icon}</div>
        {children}
      </div>

      <span
        className={cn(
          'payment__element',
          selected && 'payment__element--selected'
        )}
      />
    </button>
  );
};

export default PaymentItem;
