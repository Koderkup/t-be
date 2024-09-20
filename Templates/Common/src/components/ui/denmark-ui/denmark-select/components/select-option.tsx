import { FC } from 'react';
import { clsx as cn } from 'clsx';
import { SelectType } from '../type';
import Typo from '../../../typo/typo';

interface SelectOption extends SelectType {
  clickFn: (data: SelectType) => void;
  activeOption: string;
  type?: 'color' | 'size';
}

const SelectOption: FC<SelectOption> = ({
  label,
  color,
  clickFn,
  value,
  activeOption,
  type,
}) => {
  return (
    <button
      className={cn({
        select__option__colorButton: type === 'color',
        select__option__sizeButton: type === 'size',
      })}
      type="button"
      onClick={() => clickFn({ label, value, color })}
    >
      {color ? (
        <div
          className={cn('select__option--color', {
            'select__option--active_color': activeOption === value,
          })}
        >
          <span
            className={cn('select__option--circle')}
            style={{ backgroundColor: color }}
          />
        </div>
      ) : (
        <Typo
          className={cn('select__option--label', {
            'select__option--active_label': activeOption === value,
          })}
        >
          {label}
        </Typo>
      )}
    </button>
  );
};

export default SelectOption;
