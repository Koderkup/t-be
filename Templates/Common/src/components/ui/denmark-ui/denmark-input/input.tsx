import { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';
import { clsx as cn } from 'clsx';
import { Typo } from '../../../../components';
import { ReactComponent as Disccount } from '../../../../assets/icons/discount.svg';
import { ReactComponent as Remove } from '../../../../assets/icons/remove.svg';

interface InputTypes
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  className?: string;
  state?: 'default' | 'active';
  id: string;
  isError: boolean | null;
  isValid: boolean;
  promocodeText: string;
  clickFn?: () => void;
}
const DenmarkInput: FC<InputTypes> = ({
  className,
  state = 'default',
  isError,
  isValid,
  promocodeText,
  clickFn,
  id,
  ...rest
}) => {
  return (
    <div className="input__wrapper">
      <input
        id={id}
        className={cn(
          'input',
          state === 'default' && !isError && 'input__default',
          state === 'active' && !isError && 'input__active',
          isError && 'input__error',
          className
        )}
        {...rest}
      />
      {isError && (
        <Typo className="input__error--text">Incorrect promo code</Typo>
      )}
      {isValid && (
        <div className="input__valid">
          <Disccount />
          {promocodeText}
          <button onClick={clickFn} type="button" aria-label="remove">
            <Remove />
          </button>
        </div>
      )}
    </div>
  );
};

export default DenmarkInput;
