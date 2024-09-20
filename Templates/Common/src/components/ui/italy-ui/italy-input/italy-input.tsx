import { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';
import { clsx as cn } from 'clsx';

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
}
const ItalyInput: FC<InputTypes> = ({
  className,
  state = 'default',
  isError,
  isValid,
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
          isValid && 'input__succes',
          className
        )}
        {...rest}
      />
    </div>
  );
};

export default ItalyInput;
