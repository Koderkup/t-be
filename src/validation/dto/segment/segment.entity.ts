import { IsEnum, IsString, IsUUID, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SegmentType } from '@prisma/client';

class SegmentEntity {
  @IsUUID()
  @ApiProperty({
    example: 'f2ed56cd-f3ad-4fa3-8097-ca61e26f8086',
    description: 'The id of the segment',
  })
  id: string;

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

  @ApiProperty({
    example: '2024-05-11T14:48:34.730Z',
    description: 'Creation date',
    type: String,
    format: 'date-time',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-06-11T14:48:34.730Z',
    description: 'Last update date',
    type: String,
    format: 'date-time',
  })
  updatedAt: Date;
}

export default SegmentEntity;
