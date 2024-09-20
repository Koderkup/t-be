import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsUUID,
} from 'class-validator';

class PromoCodeCreateDto {
  @IsUUID()
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID of the shop',
  })
  shopId: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'SAVE20', description: 'Promo code' })
  code: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 20, description: 'Discount percentage' })
  discount: number;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({ example: true, description: 'Is Active' })
  isActive: boolean;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({
    example: '2024-01-01T00:00:00Z',
    description: 'Start date of the promo code',
  })
  startDate: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({
    example: '2024-12-31T23:59:59Z',
    description: 'End date of the promo code',
  })
  endDate: string;
}

export default PromoCodeCreateDto;
