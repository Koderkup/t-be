import {
  IsString,
  IsUUID,
  IsNumber,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class ProductItemBriefDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID of the shop',
  })
  shopId: string;

  @IsUUID()
  @ApiProperty({ example: 'bf3f5f10-6f97-475d-ba30-222d2027b3f1' })
  id: string;

  @IsString()
  @ApiProperty({ example: 'Stylish Shirt' })
  name: string;

  @IsString()
  @ApiProperty({ example: 'A stylish shirt perfect for casual outings.' })
  descriptionFull: string;

  @IsString()
  @ApiProperty({ example: 'Stylish and casual.' })
  descriptionShort: string;

  @IsNumber()
  @ApiProperty({ example: 45 })
  price: number;

  @IsNumber()
  @ApiProperty({ example: 22.5 })
  cost: number;

  @IsNumber()
  @ApiProperty({ example: 150 })
  stock: number;

  @IsString()
  @ApiProperty({ example: 'USD' })
  currency: string;

  @IsArray()
  @ApiProperty({
    example: [
      'https://images.unsplash.com/photo-1554568218-0f1715e72254?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
    ],
    description: 'List of image URLs',
    type: [String],
  })
  mediasUrl: string[];
}

class CategoryTypeEntityGetOne {
  @IsUUID()
  @ApiProperty({ example: '51ca4a06-493c-4a6a-94b7-772f52291e8a' })
  id: string;

  @IsString()
  @ApiProperty({ example: 'Clothing' })
  name: string;

  @IsString()
  @ApiProperty({ example: 'All kinds of clothing' })
  description: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductItemBriefDto)
  @ApiProperty({
    type: [ProductItemBriefDto],
    description: 'List of products in the category',
  })
  products: ProductItemBriefDto[];
}

export default CategoryTypeEntityGetOne;
