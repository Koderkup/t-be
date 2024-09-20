import {
  IsEnum,
  IsArray,
  IsOptional,
  IsString,
  ValidateNested,
  IsEmail,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import OrderItemDto from './order-item.dto';
import { Currency, OrderStatus } from '@prisma/client';
import { PriceDto } from '../shared';

class OrderUpdateDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ example: '123456789', required: false })
  customerId?: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({
    example: 'customer@example.com',
    description: 'The email address of the customer',
  })
  email?: string;

  @IsOptional()
  @IsEnum(Currency)
  @ApiProperty({ example: 'USD', description: 'Currency' })
  currency: Currency;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => PriceDto)
  @ApiProperty({
    type: [PriceDto],
    description: 'List of prices for the order in different currencies',
  })
  totalPrice?: PriceDto;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => PartialType(OrderItemDto))
  @ApiProperty({ type: [OrderItemDto], required: false })
  items?: OrderItemDto[];

  @IsOptional()
  @IsEnum(OrderStatus)
  @ApiProperty({
    enum: OrderStatus,
    example: OrderStatus.Pending,
    required: false,
  })
  status?: OrderStatus;
}

export default OrderUpdateDto;
