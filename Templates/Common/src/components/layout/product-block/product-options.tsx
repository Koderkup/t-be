import { FC } from 'react';
import { Dropdown, Typo } from '../../../components';
import { dropdownOptionsMap } from './helpers.ts';
import { useMainStore } from '../../../store/main-store.ts';
import { ActionSheetTypes } from '../../../shared/types/types.ts';
import { Color } from '../../../shared/types/color.interface.ts';
import { Size } from '../../../shared/types/size.interface.ts';

type Props = {
  colors?: Color[];
  sizes?: Size[];
};

const ProductOptions: FC<Props> = ({ colors, sizes }) => {
  const { setActionSheets } = useMainStore();
  const sizeOptions = dropdownOptionsMap(sizes || []);
  const colorOptions = dropdownOptionsMap(colors || []);

  return (
    <div className="options">
      <button
        type="button"
        className="options__button"
        onClick={() => setActionSheets(ActionSheetTypes.SIZE)}
      >
        <Typo className="options__button">Size table</Typo>
      </button>

      <div className="dropdown">
        <Dropdown placeholder="Choose size..." options={sizeOptions} />
        <Dropdown
          placeholder="Choose color..."
          options={colorOptions}
          type="color"
        />
      </div>
    </div>
  );
};

export default ProductOptions;
