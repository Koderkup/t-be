import { ApiProperty } from '@nestjs/swagger';

class SizeUpdateDto {
  @ApiProperty({
    example: 'Large',
    description: 'The new name of the size',
  })
  name: string;
}

export default SizeUpdateDto;
