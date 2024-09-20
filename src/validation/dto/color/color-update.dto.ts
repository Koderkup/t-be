import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class ColorUpdateDto {
  @ApiProperty({
    example: 'Blue',
    description: 'Name of the color',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    example: '#0000FF',
    description: 'Hex code of the color',
    required: false,
  })
  @IsOptional()
  @IsString()
  hexCode?: string;
}

export default ColorUpdateDto;
