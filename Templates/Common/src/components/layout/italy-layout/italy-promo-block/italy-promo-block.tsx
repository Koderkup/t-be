import { clsx as cn } from 'clsx';
import { CSSProperties, FC } from 'react';
import { Typo } from '../../../index.ts';
import { useGetPromoBlock } from '../../../../hooks/useGetPromoBlock.ts';

const ItalyPromoBlock: FC = () => {
  const { data } = useGetPromoBlock();

  return (
    <div className="promo">
      <div
        style={
          {
            backgroundImage: `url(${data?.mediaUrl || '/images/promo.png'})`,
          } as CSSProperties
        }
        className={cn('promo-block__wrapper')}
      >
        {data?.buttonText && (
          <Typo className="promo-block__text">{data?.title}</Typo>
        )}

        <div className="promo-block__media" />
      </div>
    </div>
  );
};

export default ItalyPromoBlock;
