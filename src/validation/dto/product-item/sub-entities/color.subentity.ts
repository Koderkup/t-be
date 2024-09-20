import { IsString, IsUUID, IsHexColor } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class ColorEntity {
  @IsUUID()
  @ApiProperty({ example: 'f2ed56cd-f3ad-4fa3-8097-ca61e26f8086' })
  readonly id: string;

  @IsString()
  @ApiProperty({ example: 'Blue' })
  readonly name: string;

  @IsHexColor()
  @ApiProperty({ example: '#0000FF' })
  readonly hexCode: string;
}

export default ColorEntity;
