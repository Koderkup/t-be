import { IsEnum, IsOptional, IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

class UserUpdateDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'user@example.com',
    description: 'The new email of the user',
    required: false,
  })
  email?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'newpassword',
    description: 'The new password of the user',
    required: false,
  })
  password?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Johnny',
    description: 'The new first name of the user',
    required: false,
  })
  firstname?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'User telegram_id',
    description: 'Telegram ID of the user',
    required: false,
  })
  telegramId?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Doe',
    description: 'The new last name of the user',
    required: false,
  })
  lastname?: string;

  @IsOptional()
  @IsEnum(Role)
  @ApiProperty({
    example: 'admin',
    enum: Role,
    description: 'The new role of the user',
    required: false,
  })
  role?: Role;

  @IsOptional()
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'media file',
    required: false,
  })
  mediaUrl?: string;
}

export default UserUpdateDto;
