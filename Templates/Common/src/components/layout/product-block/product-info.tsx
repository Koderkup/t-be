import { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import parse from 'html-react-parser';
import { Product } from '../../../shared/types/product.interface.ts';
import { ProductCard, Typo, ItalyColorSelect } from '../../../components';
import ProductInfoItem from './product-info-item.tsx';
import { ProductCardType } from '../../ui/product-card/types.ts';
import DenmarkCareList from './denmark-components/denmark-care-list.tsx';
import DenmarkRecommendations from './denmark-components/denmark-recommendations.tsx';

interface ProductInfoProps
  extends Partial<
    Pick<Product, 'descriptionFull' | 'careList' | 'recommendations' | 'colors'>
  > {
  designType?: 'denmark' | 'france' | 'italy';
}

const ProductInfo: FC<ProductInfoProps> = ({
  descriptionFull,
  careList,
  recommendations,
  designType,
  colors,
}) => {
  return (
    <div className="product-info">
      {descriptionFull && (
        <ProductInfoItem heading="Description">
          <Typo className="product-info__text">{descriptionFull}</Typo>
        </ProductInfoItem>
      )}

      {careList && designType !== 'denmark' && (
        <ProductInfoItem heading="Fabric & care">
          <Typo className="product-info__carelist">{parse(careList.text)}</Typo>
        </ProductInfoItem>
      )}

      {careList && designType === 'denmark' && (
        <DenmarkCareList heading="Fabric & care">
          <Typo className="product-info__carelist">{parse(careList.text)}</Typo>
        </DenmarkCareList>
      )}

      {colors && designType === 'italy' && <ItalyColorSelect colors={colors} />}

      {!!recommendations?.length && designType !== 'denmark' && (
        <ProductInfoItem
          heading="You may also like"
          className="product-info__recommendations"
        >
          <Swiper
            slidesPerView={recommendations?.length > 1 ? 1.4 : 1}
            spaceBetween={10}
            style={{ width: '100%', paddingRight: '16px' }}
          >
            {recommendations.map(elem => (
              <SwiperSlide key={elem.id}>
                <ProductCard
                  {...elem}
                  cardType={ProductCardType.COLUMN}
                  className="product-info__card"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </ProductInfoItem>
      )}

      {!!recommendations?.length && designType === 'denmark' && (
        <DenmarkRecommendations recommendations={recommendations} />
      )}
    </div>
  );
};

export default ProductInfo;
