import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsUUID,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class OrderItemUpdateDto {
  @IsUUID()
  @ApiProperty({ example: 'bf3f5f10-6f97-475d-ba30-222d2027b3f1' })
  productItemId: string;

  @IsNotEmpty()
  @ApiProperty({ example: 2 })
  quantity: number;
}

class UpdateOrderPurchaseDto {
  @IsUUID()
  @ApiProperty({ example: '51ca4a06-493c-4a6a-94b7-772f52291e8a' })
  orderId: string;

  @IsEmail()
  @ApiProperty({ example: 'customer@example.com' })
  email: string;

  @IsString()
  @ApiProperty({ example: '123 Main St, Springfield, USA' })
  address: string;

  @IsString()
  @ApiProperty({ example: 'card' })
  payment: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemUpdateDto)
  @ApiProperty({
    example: [
      { productItemId: 'bf3f5f10-6f97-475d-ba30-222d2027b3f1', quantity: 2 },
      { productItemId: 'de1fe3d4-5008-4855-b640-52901f684c95', quantity: 1 },
    ],
    description: 'List of ordered items',
    type: [OrderItemUpdateDto],
  })
  items: OrderItemUpdateDto[];
}



export default UpdateOrderPurchaseDto;
