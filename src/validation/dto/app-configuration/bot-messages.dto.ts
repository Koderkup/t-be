import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class BotMessagesDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Welcome to Tapply',
    description: 'The text of the welcome message',
  })
  welcome?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Order created',
    description: 'The text for confirming an order',
  })
  confirmOrder?: string;
}
