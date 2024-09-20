import { IsOptional, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class SegmentQueryDto {
  @IsString()
  @ApiProperty({
    example: 'c6ba76c4-bce7-45e4-867c-33c4dfff5f45',
    description: 'Shop ID',
    required: true,
  })
  shopId: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    example: 1,
    description: 'Number of days the customers has not logged',
    required: false,
  })
  days: number;
}

export default SegmentQueryDto;
