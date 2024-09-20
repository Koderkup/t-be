import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
  ValidateNested,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import OrderItemCreateDto from './order-item.dto';
import { Currency, OrderStatus } from '@prisma/client';

class OrderCreateDto {
  @IsUUID()
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID of the shop',
  })
  shopId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '123456789' })
  customerId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemCreateDto)
  @ApiProperty({ type: [OrderItemCreateDto] })
  items: OrderItemCreateDto[];

  @IsNotEmpty()
  @IsEnum(Currency)
  @ApiProperty({ example: 'USD', description: 'Currency' })
  currency: Currency;

  // @IsArray()
  // @ValidateNested({ each: true })
  // @Type(() => PriceDto)
  // @ApiProperty({
  //   type: [PriceDto],
  //   description: 'List of prices for the order in different currencies',
  // })
  // totalPrice: PriceDto;

  @IsArray()
  @ApiProperty({
    example: [{ currency: 'USD', price: 20 }],
    description: 'Prices in different currencies',
    type: [Object],
  })
  totalPrice: { currency: string; price: number };

  @IsEnum(OrderStatus)
  @ApiProperty({ enum: OrderStatus, example: OrderStatus.Pending })
  status: OrderStatus;
}

export default OrderCreateDto;
