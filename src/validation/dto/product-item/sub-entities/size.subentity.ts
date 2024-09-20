import { IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class SizeEntity {
  @IsUUID()
  @ApiProperty({ example: 'f69b3616-ec42-4471-b26e-2849e20076fb' })
  readonly id: string;

  @IsString()
  @ApiProperty({ example: 'M' })
  readonly name: string;
}

export default SizeEntity;
