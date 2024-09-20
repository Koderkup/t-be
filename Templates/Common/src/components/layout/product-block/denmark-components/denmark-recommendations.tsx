import { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Typo from '../../../ui/typo/typo';
import { Product } from '../../../../shared/types/product.interface';
import { DenmarkProductCard } from '../../../../components';
import { ProductCardType } from '../../../ui/denmark-ui/denmark-product-card/types';

const DenmarkRecommendations: FC<Pick<Product, 'recommendations'>> = ({
  recommendations,
}) => {
  return (
    <div className="product-info__recommendations--wrapper">
      <div className="product-info__recommendations--block">
        <Typo className="product-info__recommendations--heading">
          Style With
        </Typo>
        <Typo className="product-info__recommendations--paragraph">
          Best-selling items
        </Typo>
      </div>
      <Swiper
        slidesPerView={recommendations?.length > 1 ? 1.4 : 1}
        spaceBetween={10}
        style={{ width: '100%', paddingRight: '16px' }}
      >
        {recommendations.map(elem => (
          <SwiperSlide key={elem.id}>
            <DenmarkProductCard
              {...elem}
              cardType={ProductCardType.COLUMN}
              className="product-info__card"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DenmarkRecommendations;
