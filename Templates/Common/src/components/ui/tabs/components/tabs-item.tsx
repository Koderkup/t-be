import { FC, PropsWithChildren } from 'react';

type Props = PropsWithChildren & {
  onClick: () => void;
  className: string;
};

const TabsItem: FC<Props> = ({ onClick, children, className }) => {
  return (
    <button className={className} onClick={onClick} type="button">
      {children}
    </button>
  );
};

export default TabsItem;
