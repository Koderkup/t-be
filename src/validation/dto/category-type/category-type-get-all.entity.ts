import {
  IsString,
  IsUUID,
  IsArray,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class ProductBrief {
  @IsUUID()
  @ApiProperty({ example: 'bf3f5f10-6f97-475d-ba30-222d2027b3f1' })
  id: string;

  @IsString()
  @ApiProperty({ example: 'Stylish Shirt' })
  name: string;
}

class CategoryTypeBrief {
  @IsUUID()
  @ApiProperty({ example: '51ca4a06-493c-4a6a-94b7-772f52291e8a' })
  id: string;

  @IsString()
  @ApiProperty({ example: 'Subcategory' })
  name: string;
}

class CategoryTypeEntityGetAll {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID of the shop',
  })
  shopId: string;

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
  @Type(() => ProductBrief)
  @ApiProperty({
    example: [
      { id: 'bf3f5f10-6f97-475d-ba30-222d2027b3f1', name: 'Stylish Shirt' },
      { id: 'de1fe3d4-5008-4855-b640-52901f684c95', name: 'Comfortable Jeans' },
    ],
    description: 'List of products in the category',
    type: [ProductBrief],
  })
  products: ProductBrief[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CategoryTypeBrief)
  @ApiProperty({
    example: {
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: 'Parent Category',
    },
    description: 'Parent category',
    required: false,
    type: CategoryTypeBrief,
  })
  parentCategory?: CategoryTypeBrief;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CategoryTypeBrief)
  @ApiProperty({
    example: [
      { id: 'a1b2c3d4-5678-9101-1121-314151617181', name: 'Subcategory 1' },
      { id: 'b2c3d4e5-6789-0111-1213-141516171819', name: 'Subcategory 2' },
    ],
    description: 'List of subcategories in the category',
    type: [CategoryTypeBrief],
  })
  subcategories: CategoryTypeBrief[];
}

export default CategoryTypeEntityGetAll;
