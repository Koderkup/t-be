import { FC } from 'react';
import { clsx as cn } from 'clsx';
import { DropdownOptionType } from '../types.ts';
import { Typo } from '../../../../components';

const Option: FC<DropdownOptionType> = ({ label, color }) => {
  return (
    <div className="dropdown__option">
      {color && (
        <div className="dropdown__option--color">
          <span
            className={cn(
              'dropdown__option--circle',
              label === 'White' && 'dropdown__option--has-color'
            )}
            style={{ backgroundColor: color }}
          />
        </div>
      )}
      <Typo className="dropdown__option--label">{label}</Typo>
    </div>
  );
};

export default Option;
