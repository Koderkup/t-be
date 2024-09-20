import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import OrderEntity from '../order/order.entity';
import { Currency } from '@prisma/client';

class CustomerEntity {
  @ApiProperty({
    example: '14601410',
    description: 'telegram unique identification',
  })
  telegramID: string;

  @Type(() => PartialType(OrderEntity))
  @ApiProperty({
    type: [OrderEntity],
    required: false,
    description: 'List of customer orders',
  })
  orders?: (typeof PartialType<OrderEntity>)[];

  @ApiProperty({
    example: Currency.USD,
    description: 'preferred currency',
    required: false,
  })
  preferredCurrency?: Currency;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID of the shop',
  })
  shopId: string;

  @ApiProperty({
    example: new Date(),
    description: 'last login date',
  })
  lastLogin: string | Date;

  // TODO: comments entity
  @ApiProperty({
    description: 'list of comments',
  })
  Comment: Comment[];
}

export default CustomerEntity;
