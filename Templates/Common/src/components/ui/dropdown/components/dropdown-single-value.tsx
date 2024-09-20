import { FC } from 'react';
import { components, SingleValueProps } from 'react-select';
import { DropdownOptionType } from '../types.ts';
import Option from './option.tsx';

const DropdownSingleValue: FC<SingleValueProps> = props => {
  const { data } = props as SingleValueProps<DropdownOptionType>;

  return (
    <components.SingleValue {...props}>
      <Option {...data} />
    </components.SingleValue>
  );
};

export default DropdownSingleValue;
