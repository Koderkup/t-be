import { FC } from 'react';
import { components, DropdownIndicatorProps } from 'react-select';
import { ReactComponent as CustomIndicator } from '../../../../assets/icons/size-indicator.svg';

const DropdownIndicator: FC<DropdownIndicatorProps> = props => {
  const { selectProps } = props;
  const { menuIsOpen } = selectProps;

  return (
    <components.DropdownIndicator {...props}>
      <div
        style={{
          transform: menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s ease',
        }}
      >
        <CustomIndicator />
      </div>
    </components.DropdownIndicator>
  );
};

export default DropdownIndicator;
