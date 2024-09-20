import {
  IsNotEmpty,
  IsNumber,
  IsUUID,
  ValidateNested,
  IsArray,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PriceDto } from '../shared';

class OrderItemDto {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  productItemId: string;

  @IsNumber()
  @ApiProperty({ example: 2 })
  quantity: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PriceDto)
  @ApiProperty({
    type: [PriceDto],
    description: 'List of prices for the order in different currencies',
  })
  prices: PriceDto[];

  @IsOptional()
  @IsUUID()
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
    description: 'Unique color identifier',
  })
  colorId?: string;

  @IsOptional()
  @IsUUID()
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
    description: 'Unique size identifier',
  })
  sizeId?: string;
}

export default OrderItemDto;
