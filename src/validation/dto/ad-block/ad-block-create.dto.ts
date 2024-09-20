import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
} from 'class-validator';

class AdBlockCreateDto {
  @IsUUID()
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID of the shop',
  })
  shopId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Exclusive Offer', description: 'Promo Title' })
  promoTitle: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '@BUNT',
    description: 'Name for promo link',
  })
  promoLink: string;

  @IsNotEmpty()
  @IsUrl()
  @ApiProperty({
    example: 'https://example.com/promo-image.jpg',
    description: 'Promo URL',
  })
  promoURL: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({ example: true, description: 'Is Active' })
  isActive: boolean;

  @IsOptional()
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'media file',
    required: false,
  })
  mediaUrl?: string;

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

export default AdBlockCreateDto;
