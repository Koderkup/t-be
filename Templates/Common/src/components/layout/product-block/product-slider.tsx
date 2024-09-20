import { FC, useCallback, useRef } from 'react';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { ReactComponent as SliderArrow } from '../../../assets/icons/slider-arrow.svg';

type Props = {
  images?: string[];
};

const ProductSlider: FC<Props> = ({ images }) => {
  const slider = useRef<SwiperRef | null>(null);

  const handleNext = useCallback(() => slider?.current?.swiper.slideNext(), []);
  const handlePrev = useCallback(() => slider?.current?.swiper.slidePrev(), []);

  return (
    <div className="slider__block">
      <Swiper ref={slider}>
        {images?.map(image => (
          <SwiperSlide key={image}>
            <img className="product-page__slider" src={image} alt="product" />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="slider__block__buttons">
        <button
          type="button"
          className="slider__block__buttons--prev"
          onClick={handlePrev}
          aria-label="prev"
        >
          <SliderArrow />
        </button>
        <button
          type="button"
          className="slider__block__buttons--next"
          onClick={handleNext}
          aria-label="next"
        >
          <SliderArrow />
        </button>
      </div>
    </div>
  );
};

export default ProductSlider;
