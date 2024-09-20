import {
  IsNumber,
  IsString,
  IsUUID,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PriceDto } from '../shared';

class OrderItemEntity {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID of the shop',
  })
  shopId: string;

  @IsUUID()
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @IsString()
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  orderId: string;

  @IsUUID()
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  productItemId: string;

  @IsNumber()
  @ApiProperty({ example: 2 })
  quantity: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PriceDto)
  @ApiProperty({
    type: [PriceDto],
    description: 'List of prices for the order in different currencies',
  })
  prices: PriceDto[];

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
    description: 'Unique color identifier',
  })
  colorId?: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
    description: 'Unique size identifier',
  })
  sizeId?: string;
}

export default OrderItemEntity;
