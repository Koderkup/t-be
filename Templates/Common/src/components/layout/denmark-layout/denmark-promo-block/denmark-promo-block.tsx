import { clsx as cn } from 'clsx';
import { CSSProperties, FC } from 'react';
import { Link } from 'react-router-dom';
import { Typo } from '../../../index.ts';
import { useGetPromoBlock } from '../../../../hooks/useGetPromoBlock.ts';

const DenmarkPromoBlock: FC = () => {
  const { data } = useGetPromoBlock();

  return (
    <div
      style={
        {
          backgroundImage: `url(${data?.mediaUrl || '/images/promo.png'})`,
        } as CSSProperties
      }
      className={cn(
        'promo-block__wrapper',
        !data?.buttonText && 'promo-block__description'
      )}
    >
      <div className="promo-block__textWrapper">
        {data?.buttonText && (
          <Typo className="promo-block__text">{data?.title}</Typo>
        )}
        <Typo className="promo-block__text">{data?.description}</Typo>
      </div>
      {data?.buttonText && (
        <Link className="promo-block__link" to={data.link}>
          {data?.buttonText}
        </Link>
      )}
    </div>
  );
};

export default DenmarkPromoBlock;
