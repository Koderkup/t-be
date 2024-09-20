import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class ColorCreateDto {
  @IsUUID()
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID of the shop',
  })
  shopId: string;

  @ApiProperty({
    example: 'Red',
    description: 'Name of the color',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: '#FF0000',
    description: 'Hex code of the color',
  })
  @IsNotEmpty()
  @IsString()
  hexCode: string;
}

export default ColorCreateDto;
