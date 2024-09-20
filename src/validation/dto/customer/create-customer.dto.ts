import { ApiProperty } from '@nestjs/swagger';
import { Currency } from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty()
  @ApiProperty({
    example: '14601410',
    description: 'telegram unique identification',
  })
  telegramID: string;

  @IsOptional()
  @IsEnum(Currency)
  @ApiProperty({
    example: Currency.USD,
    description: 'preferred currency',
    required: false,
  })
  preferredCurrency?: Currency;

  @IsUUID()
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID of the shop',
  })
  shopId: string;

  @IsDateString()
  @ApiProperty({
    example: new Date(),
    description: 'last login date',
  })
  lastLogin: string | Date;
}
