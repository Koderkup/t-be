import { IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class ColorEntity {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID of the shop',
  })
  shopId: string;

  @IsUUID()
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @IsString()
  @ApiProperty({ example: 'Color Name' })
  name: string;

  @IsString()
  @ApiProperty({ example: 'Hex Code' })
  hexCode: string;
}

export default ColorEntity;
