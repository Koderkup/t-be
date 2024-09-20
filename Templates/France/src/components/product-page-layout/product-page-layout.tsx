import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { BackButton } from '@twa-dev/sdk/react';
import {
  ProductInfo,
  ProductOptions,
  ProductSlider,
  useBackFromProductPage,
  useProductsAPI,
} from 'common';
import { careListData, recommendationsData } from './data';

const ProductPageLayout: FC = () => {
  const params = useParams();
  const {
    product: { data },
  } = useProductsAPI(params?.productId);
  const handleBack = useBackFromProductPage();

  return (
    <>
      <BackButton onClick={() => handleBack(data?.categoryType.id)} />

      <ProductSlider images={data?.mediasUrl || ['/images/promo.png']} />

      <div className="product-page product-page__wrapper">
        <ProductOptions sizes={data?.sizes} colors={data?.colors} />

        <ProductInfo
          descriptionFull={data?.descriptionFull}
          careList={careListData}
          recommendations={recommendationsData}
        />
      </div>
    </>
  );
};

export default ProductPageLayout;
