-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('stripe', 'ton');

-- CreateEnum
CREATE TYPE "SubscriberMessageStatus" AS ENUM ('Pending', 'Sent');

-- CreateEnum
CREATE TYPE "SourceType" AS ENUM ('User', 'AI');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('user', 'admin');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('Pending', 'Paid', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled');

-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('AED', 'ARS', 'AUD', 'BDT', 'BGN', 'BHD', 'BRL', 'CAD', 'CHF', 'CLP', 'CNY', 'COP', 'CZK', 'DKK', 'EGP', 'EUR', 'GBP', 'HKD', 'HUF', 'IDR', 'ILS', 'INR', 'JPY', 'KRW', 'KWD', 'LKR', 'MAD', 'MXN', 'MYR', 'NGN', 'NOK', 'NZD', 'OMR', 'PEN', 'PHP', 'PKR', 'PLN', 'QAR', 'RON', 'RUB', 'SAR', 'SEK', 'SGD', 'THB', 'TRY', 'TWD', 'USD', 'VEF', 'VND', 'ZAR');

-- CreateEnum
CREATE TYPE "SegmentType" AS ENUM ('WithOrders', 'WithoutOrders', 'PendingStatus', 'InactiveCustomers');

-- CreateEnum
CREATE TYPE "FunctionalityType" AS ENUM ('AIAssistant', 'AIRecommendations');

-- CreateEnum
CREATE TYPE "Theme" AS ENUM ('Dark', 'Light', 'Automatic');

-- CreateEnum
CREATE TYPE "Country" AS ENUM ('Andorra', 'UnitedArabEmirates', 'Afghanistan', 'AntiguaAndBarbuda', 'Anguilla', 'Albania', 'Armenia', 'Angola', 'Antarctica', 'Argentina', 'AmericanSamoa', 'Austria', 'Australia', 'Aruba', 'AlandIslands', 'Azerbaijan', 'BosniaAndHerzegovina', 'Barbados', 'Bangladesh', 'Belgium', 'BurkinaFaso', 'Bulgaria', 'Bahrain', 'Burundi', 'Benin', 'SaintBarthelemy', 'Bermuda', 'BruneiDarussalam', 'Bolivia', 'BonaireSintEustatiusAndSaba', 'Brazil', 'Bahamas', 'Bhutan', 'BouvetIsland', 'Botswana', 'Belarus', 'Belize', 'Canada', 'CocosKeelingIslands', 'DemocraticRepublicOfTheCongo', 'CentralAfricanRepublic', 'RepublicOfTheCongo', 'Switzerland', 'CoteDIvoire', 'CookIslands', 'Chile', 'Cameroon', 'PeoplesRepublicOfChina', 'Colombia', 'CostaRica', 'Cuba', 'CapeVerde', 'Curacao', 'ChristmasIsland', 'Cyprus', 'CzechRepublic', 'Germany', 'Djibouti', 'Denmark', 'Dominica', 'DominicanRepublic', 'Algeria', 'Ecuador', 'Estonia', 'Egypt', 'WesternSahara', 'Eritrea', 'Spain', 'Ethiopia', 'Finland', 'Fiji', 'FalklandIslandsMalvinas', 'MicronesiaFederatedStatesOf', 'FaroeIslands', 'France', 'Gabon', 'UnitedKingdom', 'Grenada', 'Georgia', 'FrenchGuiana', 'Guernsey', 'Ghana', 'Gibraltar', 'Greenland', 'RepublicOfTheGambia', 'Guinea', 'Guadeloupe', 'EquatorialGuinea', 'Greece', 'SouthGeorgiaAndTheSouthSandwichIslands', 'Guatemala', 'Guam', 'GuineaBissau', 'Guyana', 'HongKong', 'HeardIslandAndMcDonaldIslands', 'Honduras', 'Croatia', 'Haiti', 'Hungary', 'Indonesia', 'Ireland', 'Israel', 'IsleOfMan', 'India', 'BritishIndianOceanTerritory', 'Iraq', 'IslamicRepublicOfIran', 'Iceland', 'Italy', 'Jersey', 'Jamaica', 'Jordan', 'Japan', 'Kenya', 'Kyrgyzstan', 'Cambodia', 'Kiribati', 'Comoros', 'SaintKittsAndNevis', 'NorthKorea', 'SouthKorea', 'Kuwait', 'CaymanIslands', 'Kazakhstan', 'LaoPeoplesDemocraticRepublic', 'Lebanon', 'SaintLucia', 'Liechtenstein', 'SriLanka', 'Liberia', 'Lesotho', 'Lithuania', 'Luxembourg', 'Latvia', 'Libya', 'Morocco', 'Monaco', 'MoldovaRepublicOf', 'Montenegro', 'SaintMartinFrenchPart', 'Madagascar', 'MarshallIslands', 'TheRepublicOfNorthMacedonia', 'Mali', 'Myanmar', 'Mongolia', 'Macao', 'NorthernMarianaIslands', 'Martinique', 'Mauritania', 'Montserrat', 'Malta', 'Mauritius', 'Maldives', 'Malawi', 'Mexico', 'Malaysia', 'Mozambique', 'Namibia', 'NewCaledonia', 'Niger', 'NorfolkIsland', 'Nigeria', 'Nicaragua', 'Netherlands', 'Norway', 'Nepal', 'Nauru', 'Niue', 'NewZealand', 'Oman', 'Panama', 'Peru', 'FrenchPolynesia', 'PapuaNewGuinea', 'Philippines', 'Pakistan', 'Poland', 'SaintPierreAndMiquelon', 'Pitcairn', 'PuertoRico', 'StateOfPalestine', 'Portugal', 'Palau', 'Paraguay', 'Qatar', 'Reunion', 'Romania', 'Serbia', 'RussianFederation', 'Rwanda', 'SaudiArabia', 'SolomonIslands', 'Seychelles', 'Sudan', 'Sweden', 'Singapore', 'SaintHelena', 'Slovenia', 'SvalbardAndJanMayen', 'Slovakia', 'SierraLeone', 'SanMarino', 'Senegal', 'Somalia', 'Suriname', 'SouthSudan', 'SaoTomeAndPrincipe', 'ElSalvador', 'SintMaartenDutchPart', 'SyrianArabRepublic', 'Eswatini', 'TurksAndCaicosIslands', 'Chad', 'FrenchSouthernTerritories', 'Togo', 'Thailand', 'Tajikistan', 'Tokelau', 'TimorLeste', 'Turkmenistan', 'Tunisia', 'Tonga', 'Turkiye', 'TrinidadAndTobago', 'Tuvalu', 'TaiwanProvinceOfChina', 'UnitedRepublicOfTanzania', 'Ukraine', 'Uganda', 'UnitedStatesMinorOutlyingIslands', 'UnitedStatesOfAmerica', 'Uruguay', 'Uzbekistan', 'HolySeeVaticanCityState', 'SaintVincentAndTheGrenadines', 'Venezuela', 'VirginIslandsBritish', 'VirginIslandsUS', 'Vietnam', 'Vanuatu', 'WallisAndFutuna', 'Samoa', 'Kosovo', 'Yemen', 'Mayotte', 'SouthAfrica', 'Zambia', 'Zimbabwe');

-- CreateTable
CREATE TABLE "AppConfiguration" (
    "id" TEXT NOT NULL,
    "minOrderAmountWithDelivery" DOUBLE PRECISION DEFAULT 0.0,
    "minOrderAmountWithoutDelivery" DOUBLE PRECISION DEFAULT 0.0,
    "location" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailPassword" TEXT,
    "shopCurrencies" "Currency"[] DEFAULT ARRAY[]::"Currency"[],
    "shopId" TEXT,
    "botToken" TEXT,
    "country" "Country",
    "forwardingId" TEXT,
    "botMessages" JSONB,
    "mediaUrl" TEXT,
    "url" TEXT,

    CONSTRAINT "AppConfiguration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "telegramID" TEXT NOT NULL,
    "preferredCurrency" "Currency" DEFAULT 'USD',
    "shopId" TEXT NOT NULL,
    "lastLogin" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("telegramID")
);

-- CreateTable
CREATE TABLE "PromoCode" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "shopId" TEXT NOT NULL,

    CONSTRAINT "PromoCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "telegramId" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT,
    "password" TEXT,
    "role" "Role" NOT NULL DEFAULT 'user',
    "mediaUrl" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPayment" (
    "id" TEXT NOT NULL,
    "paymentIdentifier" TEXT NOT NULL,
    "paymentMethod" "PaymentType" NOT NULL,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "currency" "Currency",
    "shopId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "designId" INTEGER NOT NULL,

    CONSTRAINT "UserPayment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Template" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "mediaUrl" TEXT,
    "isBlocked" BOOLEAN NOT NULL,

    CONSTRAINT "Template_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shop" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "telegramId" TEXT,
    "userId" TEXT,
    "type" TEXT NOT NULL,
    "inDraft" BOOLEAN NOT NULL DEFAULT true,
    "design_id" INTEGER,
    "templateId" TEXT,
    "description" TEXT NOT NULL,
    "mediaUrl" TEXT,

    CONSTRAINT "Shop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubscriberMessage" (
    "id" TEXT NOT NULL,
    "message" TEXT,
    "mediaUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "shopId" TEXT NOT NULL,
    "status" "SubscriberMessageStatus" NOT NULL,

    CONSTRAINT "SubscriberMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PromotionalBlock" (
    "id" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "buttonText" TEXT,
    "isActive" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "shopId" TEXT NOT NULL,
    "mediaUrl" TEXT,

    CONSTRAINT "PromotionalBlock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoryType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "parentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "shopId" TEXT NOT NULL,

    CONSTRAINT "CategoryType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductItem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "descriptionFull" TEXT NOT NULL,
    "descriptionShort" TEXT NOT NULL,
    "prices" JSONB NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,
    "stock" INTEGER NOT NULL,
    "currency" "Currency" NOT NULL,
    "careListId" TEXT,
    "categoryTypeId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "discount" INTEGER NOT NULL,
    "isFeatured" BOOLEAN NOT NULL,
    "featuredText" TEXT,
    "shopId" TEXT NOT NULL,
    "mediasUrl" TEXT[],
    "popularity" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "ProductItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "productItemId" TEXT NOT NULL,
    "content" TEXT,
    "rating" INTEGER NOT NULL,
    "customerId" TEXT NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CareList" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "shopId" TEXT NOT NULL,

    CONSTRAINT "CareList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Color" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "hexCode" TEXT NOT NULL,
    "shopId" TEXT NOT NULL,

    CONSTRAINT "Color_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Size" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "shopId" TEXT NOT NULL,

    CONSTRAINT "Size_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recommendation" (
    "id" TEXT NOT NULL,
    "productItemId" TEXT NOT NULL,
    "recommendedItemId" TEXT NOT NULL,
    "sourceType" "SourceType" NOT NULL DEFAULT 'User',
    "shopId" TEXT NOT NULL,

    CONSTRAINT "Recommendation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "orderNumber" INTEGER NOT NULL,
    "customerId" TEXT NOT NULL,
    "totalPrice" JSONB NOT NULL,
    "currency" "Currency" NOT NULL,
    "isDelivery" BOOLEAN NOT NULL DEFAULT false,
    "email" TEXT,
    "address" TEXT,
    "payment" TEXT,
    "discountAmount" DOUBLE PRECISION DEFAULT 0,
    "deliveryPrice" DOUBLE PRECISION DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "OrderStatus" NOT NULL DEFAULT 'Pending',
    "promoCodeId" TEXT,
    "shopId" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "productItemId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "prices" JSONB NOT NULL,
    "shopId" TEXT NOT NULL,
    "colorId" TEXT,
    "sizeId" TEXT,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdBlock" (
    "id" TEXT NOT NULL,
    "promoTitle" TEXT NOT NULL,
    "promoLink" TEXT NOT NULL,
    "promoURL" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "buttonText" TEXT,
    "buttonLink" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "shopId" TEXT NOT NULL,
    "mediaUrl" TEXT,

    CONSTRAINT "AdBlock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dashboard" (
    "id" TEXT NOT NULL,
    "logs" TEXT NOT NULL,
    "notifications" TEXT NOT NULL,
    "analytics" TEXT NOT NULL,

    CONSTRAINT "Dashboard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Segment" (
    "id" TEXT NOT NULL,
    "type" "SegmentType" NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Segment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Functionality" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "mediaUrl" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "type" "FunctionalityType",
    "infoForAIAssistant" TEXT,

    CONSTRAINT "Functionality_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Design" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "mediaUrl" TEXT,
    "color" TEXT,
    "font_style" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "theme" "Theme",
    "highlightColor" TEXT,
    "textSize" DOUBLE PRECISION,
    "description" TEXT,
    "tags" TEXT[],

    CONSTRAINT "Design_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProductItemToSize" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ProductItemToColor" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_FunctionalityToShop" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_FunctionalityToUserPayment" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "AppConfiguration_shopId_key" ON "AppConfiguration"("shopId");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_telegramID_key" ON "Customer"("telegramID");

-- CreateIndex
CREATE UNIQUE INDEX "PromoCode_code_key" ON "PromoCode"("code");

-- CreateIndex
CREATE UNIQUE INDEX "User_telegramId_key" ON "User"("telegramId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Template_name_key" ON "Template"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CategoryType_name_key" ON "CategoryType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CareList_name_key" ON "CareList"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Recommendation_productItemId_recommendedItemId_key" ON "Recommendation"("productItemId", "recommendedItemId");

-- CreateIndex
CREATE UNIQUE INDEX "Order_orderNumber_key" ON "Order"("orderNumber");

-- CreateIndex
CREATE UNIQUE INDEX "AdBlock_mediaUrl_key" ON "AdBlock"("mediaUrl");

-- CreateIndex
CREATE UNIQUE INDEX "Segment_type_key" ON "Segment"("type");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductItemToSize_AB_unique" ON "_ProductItemToSize"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductItemToSize_B_index" ON "_ProductItemToSize"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductItemToColor_AB_unique" ON "_ProductItemToColor"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductItemToColor_B_index" ON "_ProductItemToColor"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FunctionalityToShop_AB_unique" ON "_FunctionalityToShop"("A", "B");

-- CreateIndex
CREATE INDEX "_FunctionalityToShop_B_index" ON "_FunctionalityToShop"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FunctionalityToUserPayment_AB_unique" ON "_FunctionalityToUserPayment"("A", "B");

-- CreateIndex
CREATE INDEX "_FunctionalityToUserPayment_B_index" ON "_FunctionalityToUserPayment"("B");

-- AddForeignKey
ALTER TABLE "AppConfiguration" ADD CONSTRAINT "AppConfiguration_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromoCode" ADD CONSTRAINT "PromoCode_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPayment" ADD CONSTRAINT "UserPayment_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPayment" ADD CONSTRAINT "UserPayment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPayment" ADD CONSTRAINT "UserPayment_designId_fkey" FOREIGN KEY ("designId") REFERENCES "Design"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shop" ADD CONSTRAINT "Shop_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shop" ADD CONSTRAINT "Shop_design_id_fkey" FOREIGN KEY ("design_id") REFERENCES "Design"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shop" ADD CONSTRAINT "Shop_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscriberMessage" ADD CONSTRAINT "SubscriberMessage_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromotionalBlock" ADD CONSTRAINT "PromotionalBlock_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryType" ADD CONSTRAINT "CategoryType_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "CategoryType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryType" ADD CONSTRAINT "CategoryType_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductItem" ADD CONSTRAINT "ProductItem_careListId_fkey" FOREIGN KEY ("careListId") REFERENCES "CareList"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductItem" ADD CONSTRAINT "ProductItem_categoryTypeId_fkey" FOREIGN KEY ("categoryTypeId") REFERENCES "CategoryType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductItem" ADD CONSTRAINT "ProductItem_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("telegramID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_productItemId_fkey" FOREIGN KEY ("productItemId") REFERENCES "ProductItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CareList" ADD CONSTRAINT "CareList_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Color" ADD CONSTRAINT "Color_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Size" ADD CONSTRAINT "Size_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recommendation" ADD CONSTRAINT "Recommendation_productItemId_fkey" FOREIGN KEY ("productItemId") REFERENCES "ProductItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recommendation" ADD CONSTRAINT "Recommendation_recommendedItemId_fkey" FOREIGN KEY ("recommendedItemId") REFERENCES "ProductItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recommendation" ADD CONSTRAINT "Recommendation_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("telegramID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_promoCodeId_fkey" FOREIGN KEY ("promoCodeId") REFERENCES "PromoCode"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_productItemId_fkey" FOREIGN KEY ("productItemId") REFERENCES "ProductItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "Color"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "Size"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdBlock" ADD CONSTRAINT "AdBlock_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductItemToSize" ADD CONSTRAINT "_ProductItemToSize_A_fkey" FOREIGN KEY ("A") REFERENCES "ProductItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductItemToSize" ADD CONSTRAINT "_ProductItemToSize_B_fkey" FOREIGN KEY ("B") REFERENCES "Size"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductItemToColor" ADD CONSTRAINT "_ProductItemToColor_A_fkey" FOREIGN KEY ("A") REFERENCES "Color"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductItemToColor" ADD CONSTRAINT "_ProductItemToColor_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FunctionalityToShop" ADD CONSTRAINT "_FunctionalityToShop_A_fkey" FOREIGN KEY ("A") REFERENCES "Functionality"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FunctionalityToShop" ADD CONSTRAINT "_FunctionalityToShop_B_fkey" FOREIGN KEY ("B") REFERENCES "Shop"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FunctionalityToUserPayment" ADD CONSTRAINT "_FunctionalityToUserPayment_A_fkey" FOREIGN KEY ("A") REFERENCES "Functionality"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FunctionalityToUserPayment" ADD CONSTRAINT "_FunctionalityToUserPayment_B_fkey" FOREIGN KEY ("B") REFERENCES "UserPayment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
