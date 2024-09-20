import { FC } from 'react';
import { clsx as cn } from 'clsx';
import { Typo } from '../../../../components';

interface CartPromoCodeButtonProps {
  buttonText: 'Remove' | 'Apply';
  isError: boolean | null;
  clickFn: () => void;
  isDisabled: boolean;
  isValid: boolean;
}

const CartPromoCodeButton: FC<CartPromoCodeButtonProps> = ({
  buttonText,
  isError,
  clickFn,
  isDisabled,
  isValid,
}) => {
  return (
    <button
      type={buttonText === 'Remove' ? 'button' : 'submit'}
      onClick={buttonText === 'Remove' ? clickFn : () => {}}
      disabled={buttonText === 'Apply' && isDisabled}
      className="promo-code-form__button"
    >
      <Typo
        className={cn('promo-code-form__text', {
          'promo-code-form__text--remove': isError && buttonText === 'Remove',
          'promo-code-form__text--apply': buttonText === 'Apply',
          'promo-code-form__text--valid': isValid,
        })}
      >
        {buttonText}
      </Typo>
    </button>
  );
};

export default CartPromoCodeButton;
