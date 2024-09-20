import { IRedisUserActionLog } from '@interfaces/redis-logs.interface';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID
} from 'class-validator';

class UserActionLog implements IRedisUserActionLog {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID of the shop',
  })
  shopId: string;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    example: 'telegram id',
    description: 'ID of the customer',
  })
  customerId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'link',
    description: 'link',
  })
  link: string;

  @IsNumber()
  @ApiProperty({
    example: '1230032452',
    description:
      'The stored time value in milliseconds since midnight, January 1, 1970 UTC',
  })
  timestamp: number;
}
export default UserActionLog;
