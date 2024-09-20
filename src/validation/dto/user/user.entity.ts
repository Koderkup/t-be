import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
  IsEmail,
  IsOptional,
  IsUrl,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

class UserEntity {
  @IsUUID()
  @ApiProperty({ example: 'uuid', description: 'The id of the user' })
  id: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    example: 'user@example.com',
    description: 'The email of the user',
  })
  email: string;

  @ApiProperty({
    example: 'User telegram_id',
    description: 'Telegram ID of the user',
    required: true,
  })
  telegramId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'qwerty12345',
    description: 'The password of the user',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'John', description: 'The first name of the user' })
  firstname: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Doe', description: 'The last name of the user' })
  lastname: string;

  @IsEnum(Role)
  @ApiProperty({
    example: 'user',
    enum: Role,
    description: 'The role of the user',
  })
  role: Role;

  @IsOptional()
  @IsUrl()
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'media file',
    required: false,
  })
  mediaUrl?: string;
}

export default UserEntity;
