import {
  IsOptional,
  IsInt,
  Min,
  IsString,
  IsIn,
  IsArray,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class PaginationQueryDto {
  @ApiProperty({
    example: 10,
    description: 'Limit of items to return',
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit: number = 10;

  @ApiProperty({
    example: 0,
    description: 'Offset for items to return',
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  offset: number = 0;

  @ApiProperty({
    example: 'name',
    description: 'Column to sort by',
    required: false,
  })
  @IsOptional()
  @IsString()
  sortingColumn?: string;

  @ApiProperty({
    example: 'ASC',
    description: 'Sort order',
    enum: ['ASC', 'DESC'],
    required: false,
  })
  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  sort: 'ASC' | 'DESC' = 'ASC';

  @ApiProperty({
    example: 'sample search text',
    description: 'Text to search across fields',
    required: false,
  })
  @IsOptional()
  @IsString()
  searchString?: string;

  @ApiProperty({
    example: ['Bright'],
    description: 'Tags for filter designs',
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique identifier of the shop',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  shopId?: string;
}

export default PaginationQueryDto;
