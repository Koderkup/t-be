import { FC } from 'react';
import { ReactComponent as Emotion } from '../../../assets/icons/emotion-unhappy.svg';
import { Typo } from '../../../components';

const ModalHeading: FC = () => {
  return (
    <div className="modal__heading">
      <Emotion className="modal__icon" />
      <Typo className="modal__info">You late!</Typo>
      <Typo className="modal__description">This item is out of stock</Typo>
    </div>
  );
};

export default ModalHeading;
