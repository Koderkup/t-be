import { ApiProperty } from '@nestjs/swagger';
import { SourceType } from '@prisma/client';
import { ProductItemEntity } from '@validation/product-item/index';
import { ShopEntity } from '@validation/shop';

class RecommendationEntity {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique identifier of the recommendation',
  })
  id: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique identifier of the product item',
  })
  productItemId: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique identifier of the recommended Item',
  })
  recommendedItemId: string;

  productItem?: ProductItemEntity;

  recommendedItem?: ProductItemEntity;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique identifier of the shop',
  })
  shopId: string;

  shop?: ShopEntity;

  @ApiProperty({
    example: SourceType.User,
    enum: SourceType,
    description: 'Who set recommendation user or AI',
  })
  sourceType: SourceType;
}

export default RecommendationEntity;
