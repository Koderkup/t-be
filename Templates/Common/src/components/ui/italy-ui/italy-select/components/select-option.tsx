import { FC } from 'react';
import { clsx as cn } from 'clsx';
import { SelectType } from '../type';

interface SelectOption extends SelectType {
  clickFn: (data: SelectType) => void;
  activeOption: string;
}

const SelectOption: FC<SelectOption> = ({
  label,
  color,
  clickFn,
  value,
  activeOption,
}) => {
  return (
    <button
      className="select__option__colorButton"
      type="button"
      onClick={() => clickFn({ label, value, color })}
      aria-label="color-button"
    >
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
    </button>
  );
};

export default SelectOption;
