import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsUUID, IsOptional } from 'class-validator';

class CareListUpdateDto {
  @ApiProperty({
    description: 'Name for the care list',
    example: 'Care List 1',
  })
  @IsString()
  @IsOptional()
  readonly name: string;

  @ApiProperty({
    description: 'Array of IDs of related product items',
    example: [
      'a1b2c3d4-e5f6-7g8h-9i0j-k11l12m13n14',
      'e1f2g3h4-i5j6-k7l8-m9n0-o1p2q3r4s5t6',
    ],
    type: [String],
  })
  @IsArray()
  @IsOptional()
  @IsUUID('4', { each: true })
  readonly productItemsIds?: string[];

  @ApiProperty({
    description: 'Text content for the care list',
    example: '<p>This is some HTML content.</p>',
  })
  @IsString()
  @IsOptional()
  readonly text?: string;
}

export default CareListUpdateDto;
