import { FC, useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
import { SelectType } from './type';
import SelectOption from './components/select-option';
import Typo from '../../typo/typo';
import { useCartStore } from '../../../../store';
import { DropdownOptionType } from '../../dropdown/types';

type Props = {
  options: SelectType[];
  defaultValue?: SelectType;
};

const ItalySelect: FC<Props> = ({ options, defaultValue }) => {
  const [setColor] = useCartStore(state => [state.setSelectedColor]);

  const [activeOption, setActiveOption] = useState<SelectType>({ value: '' });

  const handleClick = useCallback(
    (data: SelectType) => {
      setColor(data as DropdownOptionType);

      setActiveOption(data);
    },
    [setColor]
  );

  useEffect(() => {
    if (defaultValue && !activeOption.value) {
      setColor(defaultValue as DropdownOptionType);
      setActiveOption(defaultValue);
    }
  }, [setColor, defaultValue, activeOption.value]);

  return (
    <div className="select__option">
      <div className="select__option__wraperr">
        <Typo className="select__option__title">Color:</Typo>
        <Typo className="select__option__colorName">{activeOption.label}</Typo>
      </div>
      <div className={clsx('select__option__colorBlock')}>
        {options.map(el => (
          <SelectOption
            key={el.value}
            activeOption={activeOption.value.toString() || ''}
            clickFn={handleClick}
            value={el.value}
            color={el.color}
            label={el.label}
          />
        ))}
      </div>
    </div>
  );
};

export default ItalySelect;
