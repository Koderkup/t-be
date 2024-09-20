import { IsOptional, IsString, IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSubscriberMessageDto {
  @ApiPropertyOptional({
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

  @ApiProperty({
    description: 'Unique identifier of the shop to which this message belongs',
    example: 'd1b6c4f1-e034-42f5-bb09-5f84b0f307a3',
  })
  @IsUUID()
  @IsNotEmpty()
  shopId: string;
}
