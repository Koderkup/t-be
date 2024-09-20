import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateSubscriberMessageDto {
  @ApiProperty({
    description: 'Text content of the message',
    example: 'New discount!',
  })
  @IsOptional()
  @IsString()
  message?: string;

  @IsOptional()
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'media file',
    required: false,
  })
  mediaUrl?: string;
}
