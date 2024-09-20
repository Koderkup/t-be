import { FC } from 'react';
import { ReactComponent as Close } from '../../../assets/icons/close-line.svg';

interface Props {
  onClick: () => void;
}

const ModalCloseButton: FC<Props> = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="modal close"
      className="modal__close"
    >
      <Close />
    </button>
  );
};

export default ModalCloseButton;
