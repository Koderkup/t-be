import { ApiProperty } from '@nestjs/swagger';

export class Template {
  @ApiProperty({
    example: 'f9a1e1d4-5bfa-4c8e-92e5-ebb5e28c45a5',
    description: 'Unique template id',
  })
  id: string;

  @ApiProperty({
    example: 'Booking',
    description: 'Unique template name',
  })
  name: string;

  @ApiProperty({
    example: 'Assists in booking travel',
    description: 'Template description',
  })
  description: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'media file',
    required: false,
  })
  mediaUrl?: string;

  @ApiProperty({
    example: true,
  })
  isBlocked: boolean;
}
