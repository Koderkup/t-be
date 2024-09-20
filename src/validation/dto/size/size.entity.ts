import { IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class SizeEntity {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID of the shop',
  })
  shopId: string;

  @IsUUID()
  @ApiProperty({ example: 'uuid', description: 'The id of the size' })
  id: string;

  @IsString()
  @ApiProperty({ example: 'Medium', description: 'The name of the size' })
  name: string;
}

export default SizeEntity;
