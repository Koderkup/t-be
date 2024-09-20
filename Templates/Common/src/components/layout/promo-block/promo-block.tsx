import { CSSProperties, FC } from 'react';
import { Typo } from '../../index';
import { useGetPromoBlock } from '../../../hooks/useGetPromoBlock.ts';

const PromoBlock: FC = () => {
  const { data } = useGetPromoBlock();

  return (
    <div
      style={
        {
          backgroundImage: `url(${data?.mediaUrl || '/images/promo.png'})`,
        } as CSSProperties
      }
      className="promo-block__wrapper"
    >
      <Typo className="promo-block__text">{data?.title}</Typo>
    </div>
  );
};

export default PromoBlock;
