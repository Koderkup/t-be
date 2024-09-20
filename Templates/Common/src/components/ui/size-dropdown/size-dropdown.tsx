import { FC, useMemo } from 'react';
import Select from 'react-select';
import { DropdownOptionType } from './types.ts';
import DropdownIndicator from './components/dropdown-indicator.tsx';
import { Size } from '../../../shared/types/size.interface.ts';
import { useCart } from '../../../hooks';

type Props = {
  options: Size[];
  uniqueId: string;
  size: Size;
};

const SizeDropdown: FC<Props> = ({ uniqueId, options, size }) => {
  const { updateItemSize } = useCart();

  const sizeOptions = useMemo(
    () => options.map(el => ({ value: el.id, label: el.name })),
    [options]
  );

  const handleChange = (newValue: unknown) => {
    updateItemSize(uniqueId, newValue as DropdownOptionType);
  };

  return (
    <Select
      isSearchable={false}
      classNamePrefix="select-size"
      onChange={handleChange}
      value={{ value: size.id, label: size.name }}
      options={sizeOptions}
      components={{
        DropdownIndicator,
      }}
    />
  );
};

export default SizeDropdown;
