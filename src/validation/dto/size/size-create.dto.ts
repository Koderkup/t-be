import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

class SizeCreateDto {
  @IsString()
  @ApiProperty({ example: 'Medium', description: 'The name of the size' })
  name: string;

  @IsUUID()
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID of the shop',
  })
  shopId: string;
}

export default SizeCreateDto;
