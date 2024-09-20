import { FC, useState } from 'react';
import { clsx as cn } from 'clsx';
import ActionSheetRoot from '../action-sheet-root.tsx';
import { Tabs, TabsItem, Typo } from '../../../../components';
import { SizeTableTypes } from '../../../../shared/types/types.ts';

const SizeActionSheet: FC = () => {
  const [activeTab, setActiveTab] = useState<SizeTableTypes>(SizeTableTypes.CM);

  console.log(activeTab);

  return (
    <ActionSheetRoot>
      <div className="size">
        <Typo className="size__title">What is my size?</Typo>

        <Typo className="size__text">
          Explore our size chart table to ensure you find the ideal fit for
          every piece in your wardrobe.
        </Typo>

        <Tabs className="size__tabs">
          <TabsItem
            className={cn(
              'size__tabs--button',
              activeTab === SizeTableTypes.CM && 'size__tabs--active'
            )}
            onClick={() => setActiveTab(SizeTableTypes.CM)}
          >
            <Typo
              className={cn(
                'size__text',
                activeTab === SizeTableTypes.CM && 'font-medium'
              )}
            >
              cm
            </Typo>
          </TabsItem>

          <TabsItem
            className={cn(
              'size__tabs--button',
              activeTab === SizeTableTypes.IN && 'size__tabs--active'
            )}
            onClick={() => setActiveTab(SizeTableTypes.IN)}
          >
            <Typo
              className={cn(
                'size__text',
                activeTab === SizeTableTypes.IN && 'font-medium'
              )}
            >
              in
            </Typo>
          </TabsItem>
        </Tabs>

        <img
          src={
            activeTab === SizeTableTypes.CM
              ? '/images/size-table.png'
              : '/images/size-table-in.png'
          }
          alt="sizes table"
          className="size__image"
        />
      </div>
    </ActionSheetRoot>
  );
};

export default SizeActionSheet;
