import {
  IsEnum,
  IsOptional,
  IsUUID,
  IsNumber,
  IsString,
  IsNotEmpty,
  IsUrl,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Country, Currency } from '@prisma/client';

class AppConfigurationCreateDto {
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

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '123 Main St', required: true })
  location: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '+1234567890', required: true })
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'info@example.com', required: true })
  email: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: '123456', required: false })
  emailPassword?: string;

  @IsEnum(Currency, { each: true })
  @ApiProperty({
    enum: Currency,
    isArray: true,
    example: [Currency.USD, Currency.EUR],
    required: true,
  })
  shopCurrencies: Currency[];

  //Поля ShopId ещё не будет существовать на момент создания конфигурации
  @IsUUID()
  @IsOptional()
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
    description: 'Unique shopId',
  })
  shopId: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: '123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11',
    required: false,
    description: 'Unique bot token',
  })
  botToken?: string;

  @IsOptional()
  @IsEnum(Country)
  @ApiProperty({
    example: Country.Poland,
    required: false,
  })
  country?: Country;

  @IsOptional()
  @IsUrl()
  @ApiProperty({
    example: 'https://test.bot/cm0qrso1v03sa9aehquxcc1ot',
    required: false,
    description: 'Url on bot',
  })
  url?: string;
}

export default AppConfigurationCreateDto;
