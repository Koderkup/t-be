import { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

type Props = {
  images?: string[];
};

const ItalySlider: FC<Props> = ({ images }) => {
  return (
    <Swiper modules={[Pagination]} pagination={{ clickable: true }}>
      {images?.map(image => (
        <SwiperSlide
          style={{ width: '100%', paddingLeft: '16px', paddingRight: '16px' }}
          key={image}
        >
          <img className="product-page__slider" src={image} alt="product" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ItalySlider;
