import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

class PriceDto {
  @IsString()
  @ApiProperty({ example: 'USD', description: 'Currency code' })
  currency: string;

  @IsNumber()
  @ApiProperty({ example: 20, description: 'Price in the specified currency' })
  price: number;
}

export default PriceDto;
