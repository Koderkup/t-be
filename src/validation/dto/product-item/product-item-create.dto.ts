import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

// TODO: because form-data validate commented fields in interceptor

class ProductItemCreateDto {
  @IsUUID()
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID of the shop',
  })
  shopId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Product Name', description: 'Product Name' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Full Description of the Product',
    description: 'Full Description',
  })
  descriptionFull: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Short Description of the Product',
    description: 'Short Description',
  })
  descriptionShort: string;

  @IsNotEmpty()
  // @IsArray()
  @ApiProperty({
    example: [{ currency: 'USD', price: 20 }],
    description: 'Prices in different currencies',
    type: [Object],
  })
  prices: { currency: string; price: number };

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'USD', description: 'Currency' })
  currency: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 50, description: 'Cost' })
  cost: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 100, description: 'Stock' })
  stock: number;

  @IsOptional()
  @IsUUID()
  @ApiProperty({
    example: 'e0a1c4e0-81a8-43b0-a7f7-29c4d0c6c3b2',
    description: 'Care List ID',
  })
  careListId?: string;

  @IsOptional()
  // @IsArray()
  // @IsUUID('all', { each: true })
  @ApiProperty({
    example: ['b6a1e890-7913-42b3-b2d5-8dbbf913bf02'],
    description: 'Colors',
  })
  colors?: string[];

  @IsOptional()
  // @IsArray()
  // @IsUUID('all', { each: true })
  @ApiProperty({
    example: ['b6a1e890-7913-42b3-b2d5-8dbbf913bf03'],
    description: 'Sizes',
  })
  sizes?: string[];

  @IsUUID()
  @IsOptional()
  @ApiProperty({
    example: 'b6a1e890-7913-42b3-b2d5-8dbbf913bf04',
    description: 'Category Type ID',
  })
  categoryTypeId?: string;

  @IsOptional()
  // @ArrayMinSize(1)
  // @IsUUID('all', { each: true })
  @ApiProperty({
    example: ['b6a1e890-7913-42b3-b2d5-8dbbf913bf05'],
    description: 'Recommendations',
  })
  recommendations?: string[];

  @IsOptional()
  // @ArrayMinSize(1)
  // @IsUUID('all', { each: true })
  @ApiProperty({
    example: ['b6a1e890-7913-42b3-b2d5-8dbbf913bf06'],
    description: 'Recommended By',
  })
  recommendedBy?: string[];

  @IsNumber()
  @ApiProperty({ example: 20, description: 'Discount' })
  discount: number;

  @IsBoolean()
  @ApiProperty({ example: true, description: 'Is Featured' })
  isFeatured: boolean;

  @IsString()
  @ApiProperty({ example: 'HOT', description: 'Featured Text' })
  featuredText: string;

  @IsOptional()
  @ApiProperty({
    type: [String],
    required: false,
    description: 'media files',
    format: 'binary',
  })
  mediasUrl?: string[];
}

export default ProductItemCreateDto;
