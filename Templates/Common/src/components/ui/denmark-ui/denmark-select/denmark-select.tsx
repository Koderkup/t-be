import { FC, useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
import { SelectType } from './type';
import SelectOption from './components/select-option';
import Typo from '../../typo/typo';
import { useCartStore } from '../../../../store';
import { DropdownOptionType } from '../../dropdown/types';

type Props = {
  options: SelectType[];
  type?: 'color' | 'size';
  title?: string;
  pageType?: 'main' | 'product';
  colorFn: (id: string) => void;
  defaultValue?: SelectType;
};

const DenmarkSelect: FC<Props> = ({
  type,
  options,
  title,
  pageType,
  colorFn,
  defaultValue,
}) => {
  const [setColor, setSize] = useCartStore(state => [
    state.setSelectedColor,
    state.setSelectedSize,
  ]);

  const [activeOption, setActiveOption] = useState<SelectType>({ value: '' });

  const handleClick = useCallback(
    (data: SelectType) => {
      if (type === 'color') {
        setColor(data as DropdownOptionType);
      } else {
        setSize(data as DropdownOptionType);
      }
      setActiveOption(data);
    },
    [setColor, setSize, type]
  );

  const handleColorClick = useCallback(
    (data: SelectType) => {
      colorFn(data.value.toString() || '');
      setActiveOption(data);
    },
    [colorFn]
  );

  useEffect(() => {
    if (defaultValue && !activeOption.value) {
      setColor(defaultValue as DropdownOptionType);
      setActiveOption(defaultValue);
    } else if (!defaultValue && type === 'color' && !activeOption.value) {
      setColor(options[0] as DropdownOptionType);
      setActiveOption(options[0]);
    }
  }, [setColor, type, defaultValue]);

  return (
    <div
      className={clsx('select__option', {
        'select__option-main': pageType === 'main',
      })}
    >
      {title && <Typo className="select__option__title">{title}</Typo>}
      {type === 'color' && pageType === 'product' && (
        <Typo className="select__option__colorName">{activeOption.label}</Typo>
      )}
      <div
        className={clsx({
          select__option__colorBlock: type === 'color',
          select__option__sizeBlock: type === 'size',
        })}
      >
        {options.map(el => (
          <SelectOption
            key={el.value}
            type={type}
            activeOption={activeOption.value.toString() || ''}
            clickFn={pageType === 'product' ? handleClick : handleColorClick}
            value={el.value}
            color={el.color}
            label={el.label}
          />
        ))}
      </div>
    </div>
  );
};

export default DenmarkSelect;
