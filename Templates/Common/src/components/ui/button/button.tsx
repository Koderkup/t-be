import { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import { clsx as cn } from 'clsx';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  variant?: 'primary' | 'secondary';
  size?: 'default' | 'large';
  icon?: ReactNode;
  align?: 'start' | 'end' | 'center';
};

const Button: FC<Props> = ({
  className,
  type = 'button',
  children,
  variant = 'primary',
  size = 'default',
  icon,
  align = 'center',
  ...rest
}) => {
  return (
    <button
      type={type}
      className={cn(
        'button',
        {
          primary: 'button--primary',
          secondary: 'button--secondary',
        }[variant],

        {
          default: 'button--default',
          large: 'button--large',
        }[size],

        {
          start: 'button--start',
          end: 'button--end',
          center: 'button--center',
        }[align],

        className
      )}
      {...rest}
    >
      {icon}
      {children}
    </button>
  );
};

export default Button;
