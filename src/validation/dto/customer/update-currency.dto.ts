import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { Currency } from '@prisma/client';

class UpdateCurrencyDto {
  @ApiProperty({ enum: Currency, description: 'Preferred currency' })
  @IsEnum(Currency)
  currency: Currency;
}

export default UpdateCurrencyDto;
