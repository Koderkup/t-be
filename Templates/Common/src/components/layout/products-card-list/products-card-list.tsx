import { FC, useMemo } from 'react';
import { clsx as cn } from 'clsx';
import { useMainStore } from '../../../store/main-store.ts';
import { GridType } from '../../../shared/types/types.ts';
import {
  ProductCard,
  ItalyProductCard,
  DenmarkProductCard,
} from '../../../components';
import { ProductCardType } from '../../ui/product-card/types.ts';
import { Product } from '../../../shared/types/product.interface.ts';

interface ProductCardsListProps {
  data: Array<Product>;
  designType?: 'denmark' | 'france' | 'italy';
}

const ProductCardsList: FC<ProductCardsListProps> = ({ data, designType }) => {
  const gridType = useMainStore(state => state.gridType);

  const getCardType = (gridType: GridType) => {
    switch (gridType) {
      case GridType.MULTIPLE:
        return ProductCardType.SMALL;
      case GridType.DOUBLE:
        return ProductCardType.COLUMN;
      case GridType.SINGLE:
        return ProductCardType.FULL;
      default:
        return ProductCardType.FULL;
    }
  };

  const getComponentByDesign = (designType: 'denmark' | 'france' | 'italy') => {
    switch (designType) {
      case 'denmark':
        return DenmarkProductCard;
      case 'france':
        return ProductCard;
      case 'italy':
        return ItalyProductCard;
      default:
        return ProductCard;
    }
  };

  const ProductComponent = useMemo(
    () => (designType ? getComponentByDesign(designType) : ProductCard),
    [designType]
  );

  return (
    <div
      className={cn(
        'products-grid',
        gridType === GridType.MULTIPLE && 'products-grid--multiple'
      )}
    >
      {data.map(card => (
        <ProductComponent
          key={card.id}
          {...card}
          cardType={getCardType(gridType)}
        />
      ))}
    </div>
  );
};

export default ProductCardsList;
