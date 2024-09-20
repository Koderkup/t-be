import {
  IsOptional,
  IsNumber,
  IsString,
  IsNumberString,
  IsUrl,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import BotMessagesDto from './bot-messages.dto';

class AppConfigurationUpdateDto {
  @IsOptional()
  @IsNumber()
  @ApiProperty({
    example: 50.0,
    description: 'Minimum order amount with delivery',
    required: false,
  })
  minOrderAmountWithDelivery?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    example: 30.0,
    description: 'Minimum order amount without delivery',
    required: false,
  })
  minOrderAmountWithoutDelivery?: number;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: '123 Main St', required: false })
  location?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: '+1234567890', required: false })
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'info@example.com', required: false })
  email?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: '123456', required: false })
  emailPassword?: string;

  @IsOptional()
  @IsNumberString()
  @ApiProperty({
    example: '661797979',
    required: false,
    description: 'Forwarding orders ID',
  })
  forwardingId?: string;

  @IsOptional()
  @ApiProperty({
    example: {
      welcome: 'Welcome to Tapply',
      confirmOrder: 'Order created',
    },
    description: 'Bot messages',
    required: false,
  })
  botMessages?: BotMessagesDto;

  @IsOptional()
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'media file',
    required: false,
  })
  mediaUrl?: string;

  @IsOptional()
  @IsUrl()
  @ApiProperty({
    example: 'https://test.bot/cm0qrso1v03sa9aehquxcc1ot',
    required: false,
    description: 'Url on bot',
  })
  url?: string;
}

export default AppConfigurationUpdateDto;
