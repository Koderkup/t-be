import { ApiProperty } from '@nestjs/swagger';
import {
  IsUUID,
  IsOptional,
  IsString,
  IsBoolean,
  IsUrl,
} from 'class-validator';

class PromotionalBlockUpdateDto {
  @IsOptional()
  @IsUrl()
  @ApiProperty({
    example: 'https://example.com',
    description: 'Link',
    required: false,
  })
  link?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Promotion Title',
    description: 'Title',
    required: false,
  })
  title?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Description of the promotional block',
    description: 'Description',
    required: false,
  })
  description?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Click Here',
    description: 'Button text',
    required: false,
  })
  buttonText?: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    example: true,
    description: 'Is Active',
    required: false,
  })
  isActive?: boolean;

  @IsOptional()
  @IsUUID()
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID of the shop',
  })
  shopId?: string;

  @IsOptional()
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'media file',
    required: false,
  })
  mediaUrl?: string;
}

export default PromotionalBlockUpdateDto;
