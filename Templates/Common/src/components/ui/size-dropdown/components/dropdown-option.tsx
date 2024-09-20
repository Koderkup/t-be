import { FC } from 'react';
import { components, OptionProps } from 'react-select';
import { DropdownOptionType } from '../types.ts';
import Option from './option.tsx';

const DropdownOption: FC<OptionProps> = props => {
  const { data } = props as OptionProps<DropdownOptionType>;

  return (
    <components.Option {...props}>
      <Option {...data} />
    </components.Option>
  );
};

export default DropdownOption;
