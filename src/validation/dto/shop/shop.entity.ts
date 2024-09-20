import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../user';
import { PromoCodeEntity } from '@validation/promo-code/index';
import { ProductItemEntity } from '@validation/product-item/index';
import { OrderEntity, OrderItemEntity } from '@validation/order/index';
import { AppConfigurationEntity } from '@validation/app-configuration/index';
import { PromotionalBlockEntity } from '@validation/promotional-block/index';
import { CategoryTypeEntityGetAll } from '@validation/category-type/index';
import { CareListEntity } from '@validation/care-list/index';
import { ColorEntity } from '@validation/color/index';
import { SizeEntity } from '@validation/size/index';
import { RecommendationEntity } from '@validation/product-item/index';
import { AdBlockEntity } from '@validation/ad-block/index';
import { CustomerEntity } from '@validation/customer/index';
import { DesignEntity } from '@validation/design';
import { FunctionalityEntity } from '@validation/functionality';
class ShopEntity {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique identifier of the shop',
  })
  id: string;

  @ApiProperty({
    example: 'My Shop',
    description: 'Name of the shop',
  })
  name: string;

  @ApiProperty({
    example: 'shop_telegram_id',
    description: 'Telegram ID of the shop',
  })
  telegramId: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique identifier of the user who owns the shop',
  })
  userId: string;

  @ApiProperty({
    example: 'User',
    description: 'User entity data',
  })
  user?: UserEntity;

  customers?: CustomerEntity[];

  promoCodes?: PromoCodeEntity[];

  products?: ProductItemEntity[];

  orders?: OrderEntity[];

  configuration?: AppConfigurationEntity;

  promotionalBlock?: PromotionalBlockEntity[];

  categoryType?: CategoryTypeEntityGetAll[];

  careList?: CareListEntity[];

  color?: ColorEntity[];

  size?: SizeEntity[];

  recommendation?: RecommendationEntity[];

  orderItem?: OrderItemEntity[];
  
  adBlock?: AdBlockEntity[];

  design?: DesignEntity;

  functionalities?: FunctionalityEntity[]


}

export default ShopEntity;
