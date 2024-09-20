import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BackButton } from '@twa-dev/sdk/react';
import {
  DenmarkDiscount,
  ItalySlider,
  ProductInfo,
  productPriceParse,
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

      <div className="mt-6">
        <ItalySlider images={data?.mediasUrl || ['/images/promo.png']} />
      </div>

      <div className="w-full flex flex-col gap-3 mt-6 text-start px-[20px]">
        <Typo className="font-bold text-[32px] leading-[125%] tracking-[-0.01em] text-black">
          {data?.name}
        </Typo>

        <DenmarkDiscount
          price={productPrices?.price || 0}
          discount={data?.discount || 0}
          currency={productPrices?.currency || 'USD'}
        />
      </div>

      <div className="product-page product-page__wrapper">
        <ProductInfo
          descriptionFull={data?.descriptionFull}
          careList={data?.careList}
          recommendations={data?.recommendations}
          colors={data?.colors}
          designType="italy"
        />
      </div>
    </>
  );
};

export default ProductPageLayout;
