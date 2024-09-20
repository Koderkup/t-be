import { ApiProperty } from '@nestjs/swagger';
import {
  IsUUID,
  IsBoolean,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

class AdBlockUpdateDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Exclusive Offer',
    description: 'Promo Title',
    required: false,
  })
  promoTitle?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: '@BUNT',
    description: 'Name for promo link',
  })
  promoLink?: string;

  @IsOptional()
  @IsUrl()
  @ApiProperty({
    example: 'https://example.com/promo-image.jpg',
    description: 'Promo URL',
    required: false,
  })
  promoURL?: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ example: true, description: 'Is Active', required: false })
  isActive?: boolean;

  @IsOptional()
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'media file',
    required: false,
  })
  mediaUrl?: string;

  @IsUUID()
  @IsOptional()
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Shop id',
    required: false,
  })
  shopId?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Limited Time Offer',
    description: 'Title',
    required: false,
  })
  title?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Get 50% off on all items',
    description: 'Description',
    required: false,
  })
  description?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Shop Now',
    description: 'Button Text',
    required: false,
  })
  buttonText?: string;

  @IsOptional()
  @IsUrl()
  @ApiProperty({
    example: 'https://example.com/shop',
    description: 'Button Link',
    required: false,
  })
  buttonLink?: string;
}

export default AdBlockUpdateDto;
