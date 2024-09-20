import { IsNotEmpty, IsUUID, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class CategoryTypeProductsDto {
  @IsNotEmpty()
  @IsArray()
  @IsUUID(4, { each: true })
  @ApiProperty({
    example: ['123e4567-e89b-12d3-a456-426614174000'],
    type: [String],
  })
  ids: string[];
}

export default CategoryTypeProductsDto;
