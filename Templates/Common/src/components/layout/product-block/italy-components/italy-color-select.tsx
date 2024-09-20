import { FC, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { dropdownOptionsMap } from '../helpers.ts';
import { Color } from '../../../../shared/types/color.interface.ts';
import ItalySelect from '../../../ui/italy-ui/italy-select/italy-select.tsx';

type Props = {
  colors?: Color[];
};

const ItalyColorSelect: FC<Props> = ({ colors }) => {
  const colorOptions = dropdownOptionsMap(colors || []);
  const location = useLocation();

  const defaultValue = useMemo(() => {
    const activeColor = colors?.find(
      el => el.id === location.state.activeColor
    );
    return activeColor
      ? {
          label: activeColor.name,
          value: activeColor.id,
          hexCode: activeColor.hexCode,
        }
      : { value: '' };
  }, [location.state.activeColor, colors]);

  return (
    <div className="options">
      <div className="dropdown">
        <ItalySelect options={colorOptions} defaultValue={defaultValue} />
      </div>
    </div>
  );
};

export default ItalyColorSelect;
