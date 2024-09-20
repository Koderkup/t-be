import { IsOptional, IsString, IsUUID, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AppConfigurationUpdateDto } from '@validation/app-configuration';
import { DesignUpdateDto } from '@validation/design';
import { Type } from 'class-transformer';

class UpdateShopDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'My Updated Shop',
    description: 'Name of the shop',
    required: false,
  })
  name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'updated_shop_telegram_id',
    description: 'Telegram ID of the shop',
    required: false,
  })
  telegramId?: string;

  @IsOptional()
  @IsUUID()
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'User ID of the shop owner',
    required: false,
  })
  userId?: string;

  @Type(() => AppConfigurationUpdateDto)
  @IsOptional()
  @ApiProperty({
    type: AppConfigurationUpdateDto,
    required: false,
    description: 'App configuration entity data',
  })
  configuration?: AppConfigurationUpdateDto;

  //@Type(() => DesignUpdateDto)
  //@IsOptional()
  //@ApiProperty({
  //  type: DesignUpdateDto,
  //  required: false,
  //  description: 'Design entity data(if you want to update your own design)',
  //})
  //design?: DesignUpdateDto;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    required: false,
    description:
      "Design id(if you don't like your own design and want to change it to an existing one)",
  })
  designId?: number;

  @ApiProperty({
    example: 1,
    description: 'Functionality ids',
  })
  // @IsNumber(undefined, { each: true })
  @IsOptional()
  functionalityIds?: number[];

  @IsUUID()
  @IsOptional()
  @ApiProperty({
    example: 'shop_template_id',
    description: 'Template ID',
  })
  templateId: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    description: 'Shop description',
  })
  description: string;

  @IsOptional()
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'media file',
    required: false,
  })
  mediaUrl?: string;

  @IsOptional()
  // @IsBoolean()
  @ApiProperty({
    example: true,
    description:
      'Until the shop is paid, it is in draft and has the value true',
  })
  inDraft?: string;
}

export default UpdateShopDto;
