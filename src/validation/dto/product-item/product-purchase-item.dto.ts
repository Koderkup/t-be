import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class ProductPurchaseItem {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  quantity: number;
}

export default ProductPurchaseItem;
