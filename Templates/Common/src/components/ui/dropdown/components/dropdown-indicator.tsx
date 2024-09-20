import { FC } from 'react';
import { components, DropdownIndicatorProps } from 'react-select';
import { ReactComponent as CustomIndicator } from '../../../../assets/icons/arrow-drop-left-line.svg';

const DropdownIndicator: FC<DropdownIndicatorProps> = props => {
  return (
    <components.DropdownIndicator {...props}>
      <CustomIndicator className="dropdown__indicator" />
    </components.DropdownIndicator>
  );
};

export default DropdownIndicator;
