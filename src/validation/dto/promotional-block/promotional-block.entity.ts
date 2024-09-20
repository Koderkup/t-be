import { ApiProperty } from '@nestjs/swagger';

class PromotionalBlockEntity {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID of the shop',
  })
  shopId: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique identifier',
  })
  id: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'media file',
    required: false,
  })
  mediaUrl?: string;

  @ApiProperty({
    example: 'https://example.com',
    description: 'Link',
  })
  link: string;

  @ApiProperty({
    example: 'Promotion Title',
    description: 'Title',
    required: false,
  })
  title?: string;

  @ApiProperty({
    example: 'Description of the promotional block',
    description: 'Description',
    required: false,
  })
  description?: string;

  @ApiProperty({
    example: 'Click Here',
    description: 'Button text',
    required: false,
  })
  buttonText?: string;

  @ApiProperty({
    example: true,
    description: 'Active status',
  })
  isActive: boolean;

  @ApiProperty({
    example: '2024-04-11T14:48:34.730Z',
    description: 'Creation date',
    type: String,
    format: 'date-time',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-04-11T14:48:34.730Z',
    description: 'Last update date',
    type: String,
    format: 'date-time',
  })
  updatedAt: Date;
}

export default PromotionalBlockEntity;
