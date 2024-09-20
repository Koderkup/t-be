import {
  IsEnum,
  IsArray,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
  IsNotEmpty,
  IsEmail,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { CustomerEntity } from '../customer';
import OrderItemEntity from './order-item.entity';
import { Currency, OrderStatus } from '@prisma/client';
import { PriceDto } from '../shared';

class OrderEntity {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID of the shop',
  })
  shopId: string;

  @IsUUID()
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @IsString()
  @ApiProperty({ example: '123456789' })
  customerId: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    example: 'customer@example.com',
    description: 'The email address of the customer',
  })
  email: string;

  @IsNotEmpty()
  @IsEnum(Currency)
  @ApiProperty({ example: 'USD', description: 'Currency' })
  currency: Currency;

  @ValidateNested()
  @IsOptional()
  @Type(() => CustomerEntity)
  @ApiProperty({ type: CustomerEntity })
  customer?: CustomerEntity;

  @ValidateNested({ each: true })
  @IsOptional()
  @Type(() => OrderItemEntity)
  @ApiProperty({ type: [OrderItemEntity] })
  items?: OrderItemEntity[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PriceDto)
  @ApiProperty({
    type: [PriceDto],
    description: 'List of prices for the order in different currencies',
  })
  totalPrice: PriceDto[];

  @IsEnum(OrderStatus)
  @ApiProperty({ enum: OrderStatus, example: OrderStatus.Pending })
  status: OrderStatus;

  @ApiProperty({
    example: '2024-04-11T14:48:34.730Z',
    description: 'Creation date',
    type: String,
    format: 'date-time',
  })
  createdAt: Date;
}

export default OrderEntity;
