import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { PriceDto } from '../shared';
import ProductItemSummaryEntity from './sub-entities/product-item-summary.subentity';

// TODO: because form-data validate commented fields in interceptor

class ProductItemUpdateDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Updated Product Name', required: false })
  readonly name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Updated Full Description of the Product',
    required: false,
  })
  readonly descriptionFull?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Updated Short Description of the Product',
    required: false,
  })
  readonly descriptionShort?: string;

  @IsOptional()
  // @IsArray()
  // @ValidateNested({ each: true })
  // @Type(() => PriceDto)
  @ApiProperty({
    type: [PriceDto],
    description: 'List of prices in different currencies',
    required: false,
  })
  readonly prices?: PriceDto[];

  @IsOptional()
  @IsNumber()
  @ApiProperty({ example: 50.0 })
  readonly cost?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ example: 100 })
  readonly stock?: number;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'EUR', required: false })
  readonly currency?: string;

  @IsOptional()
  @IsUUID()
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  readonly careListId?: string;

  @IsOptional()
  // @IsArray()
  // @IsUUID('all', { each: true })
  @ApiProperty({
    example: ['123e4567-e89b-12d3-a456-426614174000'],
    type: [String],
    required: false,
  })
  colors?: string[];

  @IsOptional()
  // @IsArray()
  // @IsUUID('all', { each: true })
  @ApiProperty({
    example: ['123e4567-e89b-12d3-a456-426614174000'],
    type: [String],
    required: false,
  })
  sizes?: string[];

  @IsOptional()
  @ApiProperty({
    type: [String],
    required: false,
    description: 'media files',
    format: 'binary',
  })
  mediasUrl?: string[];

  @IsOptional()
  @IsUUID()
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  readonly categoryTypeId?: string;

  @IsOptional()
  // @IsArray()
  // @IsUUID('all', { each: true })
  @ApiProperty({
    example: ['123e4567-e89b-12d3-a456-426614174000'],
    type: [String],
    required: false,
  })
  recommendations?: string[] | ProductItemSummaryEntity[];

  @IsOptional()
  // @IsArray()
  // @IsUUID('all', { each: true })
  @ApiProperty({
    example: ['123e4567-e89b-12d3-a456-426614174000'],
    type: [String],
    required: false,
  })
  recommendedBy?: string[] | ProductItemSummaryEntity[];

  @IsOptional()
  @IsNumber()
  @ApiProperty({ example: 20, required: false })
  readonly discount?: number;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ example: true, required: false })
  readonly isFeatured?: boolean;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'HOT', required: false })
  readonly featuredText?: string;
}

export default ProductItemUpdateDto;
