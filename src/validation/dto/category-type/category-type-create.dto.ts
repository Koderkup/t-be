import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class CategoryTypeCreateDto {
  @IsUUID()
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID of the shop',
  })
  shopId: string;

  @ApiProperty({
    example: 'Hats',
    description: 'Name of the category',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Hats are great',
    description: 'Description of the category',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    example: 'parent-category-id',
    description: 'ID of the parent category',
    required: false,
  })
  @IsOptional()
  @IsString()
  parentId?: string;
}

export default CategoryTypeCreateDto;
