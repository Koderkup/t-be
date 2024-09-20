import { FC } from 'react';
import Select from 'react-select';
import { DropdownOptionType } from './types.ts';
import DropdownIndicator from './components/dropdown-indicator.tsx';
import DropdownOption from './components/dropdown-option.tsx';
import DropdownSingleValue from './components/dropdown-single-value.tsx';
import { useCartStore } from '../../../store/cart-store.ts';

type Props = {
  placeholder: string;
  options: DropdownOptionType[];
  type?: 'color' | 'size';
};

const Dropdown: FC<Props> = ({ placeholder, options, type = 'size' }) => {
  const [color, setColor, size, setSize] = useCartStore(state => [
    state.selectedColor,
    state.setSelectedColor,
    state.selectedSize,
    state.setSelectedSize,
  ]);

  const handleChange = (newValue: unknown) => {
    if (type === 'color') {
      setColor(newValue as DropdownOptionType);
    } else {
      setSize(newValue as DropdownOptionType);
    }
  };

  return (
    <Select
      styles={{ container: base => ({ ...base, width: '100%' }) }}
      isSearchable={false}
      classNamePrefix="select"
      onChange={handleChange}
      value={type === 'color' ? color : size}
      options={options}
      placeholder={placeholder}
      components={{
        DropdownIndicator,
        Option: DropdownOption,
        SingleValue: DropdownSingleValue,
      }}
    />
  );
};

export default Dropdown;
