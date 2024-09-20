import { FC, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { dropdownOptionsMap } from '../helpers.ts';
import { Color } from '../../../../shared/types/color.interface.ts';
import { Size } from '../../../../shared/types/size.interface.ts';
import { DenmarkSelect } from '../../../../components';

type Props = {
  colors?: Color[];
  sizes?: Size[];
};

const DenmarkProductSelect: FC<Props> = ({ colors, sizes }) => {
  const sizeOptions = dropdownOptionsMap(sizes || []);
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
        <DenmarkSelect
          colorFn={() => {}}
          type="color"
          options={colorOptions}
          title="Color"
          pageType="product"
          defaultValue={defaultValue}
        />
        <DenmarkSelect
          colorFn={() => {}}
          type="size"
          options={sizeOptions}
          pageType="product"
          title="Size"
        />
      </div>
    </div>
  );
};

export default DenmarkProductSelect;
