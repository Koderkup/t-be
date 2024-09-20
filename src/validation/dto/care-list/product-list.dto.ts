import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsUUID } from 'class-validator';

class ProductListDto {
  @ApiProperty({
    type: String,
    isArray: true,
    description: 'Array of product item IDs to add to the care list',
    example: [
      'a1b2c3d4-e5f6-7g8h-9i0j-k11l12m13n14',
      'e1f2g3h4-i5j6-k7l8-m9n0-o1p2q3r4s5t6',
    ],
  })
  @IsArray()
  @IsUUID('4', { each: true })
  readonly productItemsIds: string[];
}

export default ProductListDto;
