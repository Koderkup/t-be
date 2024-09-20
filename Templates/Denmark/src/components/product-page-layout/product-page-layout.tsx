import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BackButton } from '@twa-dev/sdk/react';
import {
  DenmarkDiscount,
  DenmarkProductSelect,
  ProductInfo,
  productPriceParse,
  ProductSlider,
  Typo,
  useBackFromProductPage,
  useCartStore,
  useProductsAPI,
} from 'common';

const ProductPageLayout: FC = () => {
  const params = useParams();
  const {
    product: { data },
  } = useProductsAPI(params?.productId);
  const handleBack = useBackFromProductPage();
  const [setItemSizes] = useCartStore(state => [state.setItemSizes]);
  const productPrices = productPriceParse(data?.prices || []);

  useEffect(() => {
    setItemSizes(data?.sizes || []);
  }, [data?.sizes, setItemSizes]);

  return (
    <>
      <BackButton
        onClick={() => {
          handleBack(data?.categoryType.id);
          setItemSizes(null);
        }}
      />

      <ProductSlider images={data?.mediasUrl || ['/images/promo.png']} />

      <div className="w-full flex flex-col gap-2.5 mt-6 text-center">
        <Typo className="text-[26px] font-normal uppercase leading-[160%] text-black_90">
          {data?.name}
        </Typo>
        <DenmarkDiscount
          price={productPrices?.price || 0}
          discount={data?.discount || 0}
          currency={productPrices?.currency || 'USD'}
        />
      </div>

      <div className="product-page product-page__wrapper">
        <DenmarkProductSelect sizes={data?.sizes} colors={data?.colors} />

        <ProductInfo
          descriptionFull={data?.descriptionFull}
          careList={data?.careList}
          recommendations={data?.recommendations}
          designType="denmark"
        />
      </div>
    </>
  );
};

export default ProductPageLayout;
