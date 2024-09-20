import { ApiProperty } from '@nestjs/swagger';
import {
  CategoryTypeEntity,
  ColorEntity,
  SizeEntity,
  ProductItemSummaryEntity,
  CareListEntity,
} from './sub-entities';
import { PriceDto } from '../shared';

class ProductItemEntity {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID of the shop',
  })
  shopId: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  readonly id: string;

  @ApiProperty({ example: 'Product Name' })
  readonly name: string;

  @ApiProperty({ example: 'Full Description of the Product' })
  readonly descriptionFull: string;

  @ApiProperty({ example: 'Short Description of the Product' })
  readonly descriptionShort: string;

  @ApiProperty({
    type: [PriceDto],
    description: 'List of prices in different currencies',
  })
  prices: PriceDto[];

  @ApiProperty({ example: 50.0 })
  readonly cost: number;

  @ApiProperty({ example: 100 })
  readonly stock: number;

  @ApiProperty({ example: 'USD' })
  readonly currency: string;

  @ApiProperty({
    example: [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
    ],
    type: [String],
    required: false,
    description: 'Media urls',
  })
  mediasUrl?: string[];

  @ApiProperty({ type: CategoryTypeEntity })
  readonly categoryType?: CategoryTypeEntity;

  @ApiProperty({ type: CareListEntity })
  readonly careList?: CareListEntity;

  @ApiProperty({ type: [ColorEntity] })
  readonly colors?: ColorEntity[];

  @ApiProperty({ type: [SizeEntity] })
  readonly sizes?: SizeEntity[];

  @ApiProperty({ type: [ProductItemSummaryEntity] })
  readonly recommendations?: ProductItemSummaryEntity[];

  @ApiProperty({ type: [ProductItemSummaryEntity] })
  readonly recommendedBy?: ProductItemSummaryEntity[];

  @ApiProperty({ example: 20 })
  readonly discount: number;

  @ApiProperty({ example: true })
  readonly isFeatured: boolean;

  @ApiProperty({ example: 'HOT' })
  readonly featuredText?: string;

  @ApiProperty({
    example: 20,
    description:
      'Popularity value as a percentage. Defaults to 0 and is updated weekly based on product activity: sales count, comments count, average rating and newness(createdAt or updatedAt).',
  })
  readonly popularity: number;
}

export default ProductItemEntity;
