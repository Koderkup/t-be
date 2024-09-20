import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsIn, IsString, IsOptional, IsArray } from 'class-validator';

class DesignUpdateDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'Paris',
    description: 'Name of the color',
  })
  name?: string;

  @IsOptional()
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'media file',
    required: false,
  })
  mediaUrl?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Red',
    description: 'Some Color',
  })
  color?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Red',
    description: 'Some font style',
  })
  font_style?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ example: 299, description: 'Price of design' })
  price?: number;

  @IsOptional()
  @IsIn(['Dark', 'Light', 'Automatic'])
  @ApiProperty({ example: 'Light', description: 'Theme of design' })
  theme?: 'Dark' | 'Light' | 'Automatic';

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Red',
    description: 'Some highlight color',
  })
  highlightColor?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ example: 12.5, description: 'Text size' })
  textSize?: number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Red',
    description: 'Some design description',
  })
  description?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ApiProperty({
    example: ['Light', 'Classic'],
    description: 'Design tags array',
  })
  tags?: string[];
}
export default DesignUpdateDto;
