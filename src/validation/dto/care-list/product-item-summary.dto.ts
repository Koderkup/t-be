import { IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class ProductItemSummaryDto {
  @IsUUID()
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @IsString()
  @ApiProperty({ example: 'Product Name' })
  name: string;

  @IsString()
  @ApiProperty({ example: 'Short Description of the Product' })
  descriptionShort: string;
}

export default ProductItemSummaryDto;
