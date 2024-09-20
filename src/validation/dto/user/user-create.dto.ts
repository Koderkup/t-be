import {
  IsOptional, IsEnum,
  IsNotEmpty,
  IsString,
  IsEmail,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

class UserCreateDto {
  @IsOptional()
  @IsEmail()
  @ApiProperty({
    example: 'user@example.com',
    description: 'The email of the user',
    required: false,
  })
  email?: string;

  @IsOptional()
  @IsUUID()
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID of the shop',
    required: false,
  })
  shopId?: string;

  @IsString()
  @ApiProperty({
    example: 'User telegram_id',
    description: 'Telegram ID of the user',
    required: true,
  })
  telegramId: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'password',
    description: 'The password of the user',
    required: false,
  })
  password?: string | null;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'John', description: 'The first name of the user' })
  firstname: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Doe', description: 'The last name of the user' })
  lastname: string;

  @IsEnum(Role)
  @IsOptional()
  @ApiProperty({
    example: 'user',
    enum: Role,
    required: false,
    description: 'The role of the user',
  })
  role?: Role;
}

export default UserCreateDto;
