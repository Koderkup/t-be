import {
  IsNumber,
  IsNotEmpty,
  IsString,
  IsUUID,
  IsEmail,
  IsOptional,
  IsUrl,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AdBlockEntity } from '@validation/ad-block';
import {
  AppConfigurationCreateDto,
  AppConfigurationEntity,
} from '@validation/app-configuration';
import { CareListEntity } from '@validation/care-list';
import { CategoryTypeEntityGetAll } from '@validation/category-type';
import { ColorEntity } from '@validation/color';
import { CustomerEntity } from '@validation/customer';
import { OrderEntity, OrderItemEntity } from '@validation/order';
import {
  ProductItemEntity,
  RecommendationEntity,
} from '@validation/product-item';
import { PromoCodeEntity } from '@validation/promo-code';
import { PromotionalBlockEntity } from '@validation/promotional-block';
import { SizeEntity } from '@validation/size';
import { UserEntity } from '@validation/user';
import { Type } from 'class-transformer';
import { DesignCreateDto, DesignEntity } from '@validation/design';

class CreateShopDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'My Shop', description: 'Name of the shop' })
  name: string;

  //@IsString()
  //@IsNotEmpty()
  //@ApiProperty({
  //  example: 'Address',
  //  description: 'Some Address',
  //})
  //address: string;

  //@IsString()
  //@IsNotEmpty()
  //@ApiProperty({
  //  example: 'Address',
  //  description: 'Some Address',
  //})
  //phone: string;

  //@IsEmail()
  //@IsNotEmpty()
  //@ApiProperty({
  //  example: 'Address',
  //  description: 'Some Address',
  //})
  //email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Art and Crafts',
    description: 'Shop type',
  })
  type: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'shop_telegram_id',
    description: 'Telegram ID of the shop',
  })
  telegramId: string;

  @IsUUID()
  @IsOptional()
  @ApiProperty({
    example: 'shop_template_id',
    description: 'Template ID',
  })
  templateId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    description: 'Shop description',
  })
  description: string;

  @IsOptional()
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'media file',
    required: false,
  })
  mediaUrl?: string;

  //@IsUUID()
  //@IsNotEmpty()
  //@ApiProperty({
  //  example: '123e4567-e89b-12d3-a456-426614174000',
  //  description: 'User ID of the shop owner',
  //})
  //userId: string;

  //@IsOptional()
  //@ApiProperty({
  //  example: 'User',
  //  description: 'User entity data',
  //})
  //user?: UserEntity;

  //customers?: CustomerEntity[];

  //promoCodes?: PromoCodeEntity[];

  //products?: ProductItemEntity[];

  //orders?: OrderEntity[];
  //@Type(() => AppConfigurationCreateDto)
  //@IsOptional()
  //@ApiProperty({
  //  type: AppConfigurationCreateDto,
  //  required: false,
  //  description: 'App configuration entity data',
  //})
  //configuration?: AppConfigurationCreateDto;

  //@Type(() => DesignCreateDto)
  //@IsOptional()
  //@ApiProperty({
  //  type: DesignCreateDto,
  //  required: false,
  //  description: 'Design entity data',
  //})
  //design?: DesignCreateDto;

  //@IsOptional()
  //@IsNumber()
  //@ApiProperty({
  //  required: false,
  //  example: 123,
  //  description: 'Already Existing Design Id',
  //})
  //designId?: number;

  //@ApiProperty({
  //  example:
  //    '["a1b2c3d4-e5f6-7g8h-9i0j-k11l12m13n14", "a1b2c3d4-e5f6-7g8h-9i0j-k11l12m13n14"]',
  //  description: 'Functionality ids',
  //})
  //@IsUUID(undefined, { each: true })
  //@IsOptional()
  //functionalityIds?: string[];

  //PromotionalBlock?: PromotionalBlockEntity[];

  //CategoryType?: CategoryTypeEntityGetAll[];

  //CareList?: CareListEntity[];

  //Color?: ColorEntity[];

  //Size?: SizeEntity[];

  //Recommendation?: RecommendationEntity[];

  //OrderItem?: OrderItemEntity[];

  //AdBlock?: AdBlockEntity[];
}

export default CreateShopDto;
