import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  Min,
  Max,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { MatchDecorator } from 'src/decorators';

class ResetPasswordDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'user@example.com',
    description: 'The email address of the user',
  })
  email: string;

  @IsPositive()
  @IsNotEmpty()
  @IsNumber()
  @Min(100000)
  @Max(999999)
  @ApiProperty({
    example: '123456',
    description: 'The reset password code',
  })
  code: number;

  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minUppercase: 1,
    minSymbols: 0,
  })
  @ApiProperty({
    example: 'Password12345',
    description: 'New password',
  })
  password: string;

  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minUppercase: 1,
    minSymbols: 0,
  })
  @MatchDecorator('password', { message: 'Passwords do not match' })
  @ApiProperty({
    example: 'Password12345',
    description: 'New password confirm',
  })
  passwordConfirm: string;
}

export default ResetPasswordDto;
