import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button, Typo } from '../../../../components';
import { AdBlock } from '../../../../shared/types/ad-block.interface.ts';

const FooterSubscribe: FC<
  Partial<
    Pick<
      AdBlock,
      'title' | 'description' | 'buttonLink' | 'buttonText' | 'mediaUrl'
    >
  >
> = ({ title, buttonText, buttonLink, description, mediaUrl }) => {
  return (
    <div className="subscribe">
      <div className="subscribe__media">
        <img src={mediaUrl} alt="subscribe" />
      </div>

      <div className="subscribe__wrapper">
        <div className="subscribe__text">
          <Typo tag="h3" className="subscribe__text__title">
            {title}
          </Typo>

          <Typo tag="p" className="subscribe__text__description">
            {description}
          </Typo>
        </div>

        <Button className="subscribe__button">
          <Link
            to={buttonLink || ''}
            className="subscribe__button__button-link"
          >
            <Typo className="subscribe__button__button-text">{buttonText}</Typo>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default FooterSubscribe;
