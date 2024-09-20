import { FC } from 'react';
import ModalRoot from '../modal-root.tsx';
import Typo from '../../typo/typo.tsx';
import TextField from '../../text-field/text-field.tsx';
import Button from '../../button/button.tsx';

const UseBonuseModal: FC = () => {
  return (
    <ModalRoot isHeadingActive={false}>
      <div className="bonuse">
        <div className="bonuse__wrapper">
          <Typo className="bonuse__title">Use bonuses</Typo>
          <div className="bonuse__block">
            <Typo className="bonuse__block__text">Your bonuses</Typo>
            <Typo className="bonuse__block__text">$100.99</Typo>
          </div>
        </div>

        <form className="bonuse__form">
          <TextField id="amount" placeholder="Write amount" />
          <div className="bonuse__button">
            <Button variant="secondary" size="large">
              <Typo className="cart__text">Use</Typo>
            </Button>
          </div>
        </form>
      </div>
    </ModalRoot>
  );
};

export default UseBonuseModal;
