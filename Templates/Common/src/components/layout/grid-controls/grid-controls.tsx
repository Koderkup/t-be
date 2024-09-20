import { FC, ReactNode } from 'react';
import { clsx as cn } from 'clsx';
import { useMainStore } from '../../../store/main-store.ts';
import { GridType } from '../../../shared/types/types.ts';
import { Tabs, TabsItem } from '../../../components';

type Props = {
  data: {
    id: GridType;
    icon: ReactNode;
  }[];
};

const GridControls: FC<Props> = ({ data }) => {
  const [gridType, setGridType] = useMainStore(state => [
    state.gridType,
    state.setGridType,
  ]);

  const handleGridChange = (type: GridType) => {
    setGridType(type);
  };

  return (
    <Tabs className="controls__tabs">
      {data.map(({ icon, id }) => (
        <TabsItem
          key={id}
          className={cn(
            'controls__item',
            gridType === id && 'controls__item-active'
          )}
          onClick={() => handleGridChange(id)}
        >
          {icon}
        </TabsItem>
      ))}
    </Tabs>
  );
};

export default GridControls;
