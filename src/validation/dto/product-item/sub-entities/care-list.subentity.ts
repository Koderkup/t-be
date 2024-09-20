import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

class CareListEntity {
  @ApiProperty({
    description: 'ID of an care list points',
    example: 'a1b2c3d4-e5f6-7g8h-9i0j-k11l12m13n14',
    type: String,
  })
  @IsUUID('4')
  readonly id: string;

  @ApiProperty({
    description: 'Name of the care list',
    example: 'Title 1',
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

export default CareListEntity;
