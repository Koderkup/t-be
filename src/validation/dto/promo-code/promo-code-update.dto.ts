import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

class PromoCodeUpdateDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'SAVE20',
    description: 'Promo code',
    required: false,
  })
  code?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    example: 20,
    description: 'Discount percentage',
    required: false,
  })
  discount?: number;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ example: true, description: 'Is Active', required: false })
  isActive?: boolean;

  @IsOptional()
  @IsDateString()
  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
    description: 'Start date of the promo code',
    required: false,
  })
  startDate?: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty({
    example: '2024-12-31T23:59:59.000Z',
    description: 'End date of the promo code',
    required: false,
  })
  endDate?: string;
}

export default PromoCodeUpdateDto;
