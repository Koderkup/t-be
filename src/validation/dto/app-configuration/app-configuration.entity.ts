import { ApiProperty } from '@nestjs/swagger';
import { Country, Currency } from '@prisma/client';
import BotMessagesDto from './bot-messages.dto';

class AppConfigurationEntity {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID of the shop',
  })
  shopId: string;

  @ApiProperty({
    example: 'uuid123',
    description: 'The unique identifier for the configuration',
  })
  id: string;

  @ApiProperty({
    example: 50.0,
    description: 'Minimum order amount with delivery',
    required: false,
  })
  minOrderAmountWithDelivery?: number;

  @ApiProperty({
    example: 30.0,
    description: 'Minimum order amount without delivery',
    required: false,
  })
  minOrderAmountWithoutDelivery?: number;

  @ApiProperty({ example: '123 Main St', required: false })
  location?: string;

  @ApiProperty({ example: '+1234567890', required: false })
  phoneNumber?: string;

  @ApiProperty({ example: 'info@example.com', required: false })
  email?: string;

  @ApiProperty({ example: '123456', required: false })
  emailPassword?: string;

  @ApiProperty({
    type: 'array',
    items: {
      type: 'object',
      properties: { value: { type: 'string' }, label: { type: 'string' } },
    },
    description: 'List of supported shop currencies with labels',
  })
  shopCurrencies?: { value: string; label: string }[] | Currency[];

  @ApiProperty({
    example: '123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11',
    required: false,
    description: 'Unique bot token',
  })
  botToken?: string;

  @ApiProperty({
    example: 'forwarding_id',
    required: false,
    description: 'Forwarding orders ID',
  })
  forwardingId?: string;

  @ApiProperty({
    example: {
      welcome: 'Welcome to Tapply',
      confirmOrder: 'Order created',
    },
    description: 'Bot messages',
  })
  botMessages?: BotMessagesDto;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'media file',
    required: false,
  })
  mediaUrl?: string;

  @ApiProperty({
    example: Country.Poland,
    required: false,
  })
  country?: Country;

  @ApiProperty({
    example: 'https://test.bot/cm0qrso1v03sa9aehquxcc1ot',
    required: false,
    description: 'Url on bot',
  })
  url?: string;
}

export default AppConfigurationEntity;
