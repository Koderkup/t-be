import { FC } from 'react';
import { ReactComponent as ArrowRight } from '../../../../assets/icons/arrow-right-up-line.svg';
import { Typo } from '../../../../components';
import { AdBlock } from '../../../../shared/types/ad-block.interface.ts';

const FooterHeading: FC<
  Partial<Pick<AdBlock, 'promoTitle' | 'promoURL' | 'promoLink'>>
> = ({ promoTitle, promoLink, promoURL }) => (
  <>
    <Typo tag="h2" className="footer__promo-title">
      {promoTitle}
    </Typo>

    <a
      href={promoLink}
      aria-label="inst"
      rel="noreferrer"
      className="footer__promo-url"
    >
      <Typo className="footer__promo-text">{promoURL}</Typo>
      <ArrowRight className="footer__arrow" />
    </a>
  </>
);

export default FooterHeading;
