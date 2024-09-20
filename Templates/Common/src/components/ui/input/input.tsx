import { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';
import { clsx as cn } from 'clsx';
import { ReactComponent as CompleteIcon } from '../../../assets/icons/complete.svg';
import { Typo } from '../../../components';

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
  textWidth: number;
}
const Input: FC<InputTypes> = ({
  className,
  state = 'default',
  isError,
  isValid,
  id,
  textWidth,
  ...rest
}) => {
  const spacing = textWidth + 24;
  return (
    <div>
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
        <div className="input__valid" style={{ left: `${spacing}px` }}>
          <CompleteIcon />
        </div>
      )}
    </div>
  );
};

export default Input;
