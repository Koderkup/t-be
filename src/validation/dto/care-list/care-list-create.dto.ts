import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

class CareListCreateDto {
  @IsUUID()
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID of the shop',
  })
  shopId: string;

  @ApiProperty({
    description: 'Name for the care list',
    example: 'Care List 1',
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: 'Text content for the care list',
    example: '<p>This is some HTML content.</p>',
  })
  @IsString()
  readonly text: string;
}

export default CareListCreateDto;
