import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class CategoryTypeUpdateDto {
  @ApiProperty({
    example: 'Hats',
    description: 'Name of the category',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    example: 'Hats are great',
    description: 'Description of the category',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 'parent-category-id',
    description: 'ID of the parent category',
    required: false,
  })
  @IsOptional()
  @IsString()
  parentId?: string;
}

export default CategoryTypeUpdateDto;
