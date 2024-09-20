import { FC, PropsWithChildren } from 'react';
import { clsx as cn } from 'clsx';

type Props = PropsWithChildren & {
  className?: string;
};

const Tabs: FC<Props> = ({ children, className }) => {
  return (
    <div className={cn('flex w-full justify-end gap-1.5', className)}>
      {children}
    </div>
  );
};

export default Tabs;
