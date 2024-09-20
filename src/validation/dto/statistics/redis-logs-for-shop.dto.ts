import { IRedisLog, MsgType } from '@interfaces/redis-logs.interface';
import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '@prisma/client';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  IsEnum,
  IsOptional,
} from 'class-validator';

class ShopRedisLog implements IRedisLog {
  @IsUUID()
  @IsOptional()
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID of the order',
  })
  orderId?: string;

  @IsUUID()
  @IsOptional()
  @ApiProperty({
    example: 'telegram id',
    description: 'ID of the customer',
  })
  customerId?: string;

  @IsEnum(OrderStatus)
  @IsOptional()
  @ApiProperty({
    example: 'Pending',
    description: 'order Status',
  })
  orderStatus: OrderStatus;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: '1230032452',
    description:
      'The stored time value in milliseconds since midnight, January 1, 1970 UTC',
  })
  timestamp: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 0,
    description:
      'The message type( enum MsgType {ERROR = 0,INFO = 1,WARNING = 2})',
  })
  msgType: MsgType;
  @IsOptional()
  @IsString()
  message?: string;
  @IsOptional()
  @IsString()
  stack?: string;
  @IsOptional()
  @IsString()
  name?: string;
}
export default ShopRedisLog;
