import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SegmentType } from '@prisma/client';

class SegmentCreateDto {
  @IsEnum(SegmentType)
  @ApiProperty({
    enum: SegmentType,
    example: SegmentType.InactiveCustomers,
    description: 'Segment type',
    required: true,
  })
  type: SegmentType;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'Users without orders',
    description: 'Segment type description',
    required: false,
  })
  description: string;
}

export default SegmentCreateDto;
