import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

class EmailDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'example@email.com', description: 'Currency code' })
  email: string;
}

export default EmailDto;
