import { ApiProperty } from '@nestjs/swagger';

class AdBlockEntity {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID of the shop',
  })
  shopId: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique identifier',
  })
  id: string;

  @ApiProperty({ example: 'Exclusive Offer', description: 'Promo Title' })
  promoTitle: string;

  @ApiProperty({
    example: '@BUNT',
    description: 'Name for promo link',
  })
  promoLink: string;

  @ApiProperty({
    example: 'https://example.com/promo-image.jpg',
    description: 'Promo URL',
  })
  promoURL: string;

  @ApiProperty({ example: true, description: 'Is Active' })
  isActive: boolean;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'media file',
    required: false,
  })
  mediaUrl?: string;

  @ApiProperty({
    example: 'Limited Time Offer',
    description: 'Title',
    required: false,
  })
  title?: string;

  @ApiProperty({
    example: 'Get 50% off on all items',
    description: 'Description',
    required: false,
  })
  description?: string;

  @ApiProperty({
    example: 'Shop Now',
    description: 'Button Text',
    required: false,
  })
  buttonText?: string;

  @ApiProperty({
    example: 'https://example.com/shop',
    description: 'Button Link',
    required: false,
  })
  buttonLink?: string;

  @ApiProperty({
    example: '2024-04-11T14:48:34.730Z',
    description: 'Creation date',
    type: String,
    format: 'date-time',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-04-11T14:48:34.730Z',
    description: 'Last update date',
    type: String,
    format: 'date-time',
  })
  updatedAt: Date;
}

export default AdBlockEntity;
