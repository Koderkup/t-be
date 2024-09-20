import { forwardRef, InputHTMLAttributes } from 'react';
import { clsx as cn } from 'clsx';
import { Typo } from '../..';

interface CustomTextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  multiline?: boolean;
  errorMessage?: string;
  isError?: boolean;
  className?: string;
  id: string;
  value?: string;
}

type RefType = HTMLInputElement | HTMLTextAreaElement;

const TextField = forwardRef<RefType, CustomTextFieldProps>(
  (
    { label, id, multiline, errorMessage, isError, value, className, ...rest },
    ref
  ) => {
    return (
      <div className="text-field">
        {label && (
          <label className="text-field__label" htmlFor={id}>
            {label}
          </label>
        )}
        <div className="text-field__wrapper">
          {multiline ? (
            <textarea
              id={id}
              value={value}
              ref={ref as React.Ref<HTMLTextAreaElement>}
              className={cn(
                'text-field__default',
                className,
                isError && 'text-field__error'
              )}
              {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
            />
          ) : (
            <input
              id={id}
              value={value}
              ref={ref as React.Ref<HTMLInputElement>}
              className={cn(
                'text-field__default',
                className,
                isError && 'text-field__error'
              )}
              {...rest}
            />
          )}
          {errorMessage && (
            <Typo className="text-field__error--message">{errorMessage}</Typo>
          )}
        </div>
      </div>
    );
  }
);

export default TextField;
