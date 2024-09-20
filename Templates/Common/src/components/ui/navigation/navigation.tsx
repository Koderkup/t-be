import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Typo } from '../../index';
import { RoutesPaths } from '../../../shared';
import { useCategoriesAPI } from '../../../hooks/useCategoriesAPI.ts';

const Navigation: FC = () => {
  const { categories } = useCategoriesAPI();

  return (
    <div className="navigation">
      <Swiper
        slidesPerView={categories?.data?.length}
        className="navigation__swiper"
      >
        <SwiperSlide>
          <NavLink
            to={RoutesPaths.HOME}
            type="button"
            className={({ isActive }) =>
              `navigation__link ${isActive ? 'navigation__link-active' : ''}`
            }
          >
            <Typo className="navigation__text">All</Typo>
          </NavLink>
        </SwiperSlide>
        {categories?.data?.map(({ id, name }) => (
          <SwiperSlide key={id}>
            <NavLink
              state={{ categoryId: id }}
              to={`${RoutesPaths.CATEGORIES}/${id}`}
              type="button"
              className={({ isActive }) =>
                `navigation__link ${isActive ? 'navigation__link-active' : ''}`
              }
            >
              <Typo className="navigation__text">{name}</Typo>
            </NavLink>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Navigation;
