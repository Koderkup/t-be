import { FC, PropsWithChildren } from 'react';

type Props = PropsWithChildren & {
  onClick?: () => void;
};

const IconButton: FC<Props> = ({ onClick, children }) => {
  return (
    <button type="button" onClick={onClick} className="icon-button">
      {children}
    </button>
  );
};

export default IconButton;
