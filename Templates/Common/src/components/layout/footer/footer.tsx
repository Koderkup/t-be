import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import FooterHeading from './components/footer-heading.tsx';
import FooterSubscribe from './components/footer-subscribe.tsx';
import { Accordion, Typo } from '../../../components';
import { useAdBlocksAPI } from '../../../hooks/useAdBlocksAPI.ts';
import { footerData } from './data.ts';
import { RoutesPaths } from '../../../shared';
import { useMainStore } from '../../../store';
import ItalyFooterSubscribe from './components/italy-footer-subscribe.tsx';
import { useShopId } from '../../../hooks/useShopId.ts';

const Footer: FC = () => {
  const {
    activeAdBlock: { data },
  } = useAdBlocksAPI();
  const { contactUs, services } = footerData;
  const [designType] = useMainStore(state => [state.designType]);
  const shopId = useShopId();
  const { pathname } = useLocation();
  const isOrderPages = pathname.includes(RoutesPaths.ORDER_HISTORY);
  const isInfoPage = pathname.includes(RoutesPaths.INFO);
  const isProfileInformation = pathname.includes(
    RoutesPaths.PROFILE_INFORMATION
  );
  const isNavigationPage = pathname.includes(shopId || '');

  if (isOrderPages || isInfoPage || isProfileInformation || isNavigationPage)
    return null;

  return (
    <footer className="footer">
      <FooterHeading
        promoURL={data?.promoURL}
        promoLink={data?.promoLink}
        promoTitle={data?.promoTitle}
      />

      {designType !== 'italy' ? (
        <FooterSubscribe
          title={data?.title}
          buttonText={data?.buttonText}
          buttonLink={data?.buttonLink}
          description={data?.description}
          mediaUrl={data?.mediaUrl || '/images/footer-img.png'}
        />
      ) : (
        <ItalyFooterSubscribe
          title={data?.title}
          buttonText={data?.buttonText}
          buttonLink={data?.buttonLink}
          description={data?.description}
          mediaUrl={data?.mediaUrl || '/images/footer-img.png'}
        />
      )}

      <Accordion>
        <Accordion.Item id={1} body={services}>
          <Typo className="footer__typo">Services</Typo>
        </Accordion.Item>

        <Accordion.Item id={2} body={contactUs}>
          <Typo className="footer__typo">Contact us</Typo>
        </Accordion.Item>
      </Accordion>
    </footer>
  );
};

export default Footer;
