import { ApiProperty } from '@nestjs/swagger';
import { SubscriberMessageStatus } from '@prisma/client';

export class SubscriberMessage {
  @ApiProperty({
    description: 'Unique identifier for the message',
    example: 'f9a1e1d4-5bfa-4c8e-92e5-ebb5e28c45a5',
  })
  id: string;

  @ApiProperty({
    description: 'Text content of the message',
    example: 'New discount!',
    nullable: true,
  })
  message?: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'media file',
    required: false,
  })
  mediaUrl?: string;

  @ApiProperty({
    description: 'Timestamp when the message was created',
    example: '2023-08-23T14:15:22Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Unique identifier of the shop associated with this message',
    example: 'd1b6c4f1-e034-42f5-bb09-5f84b0f307a3',
  })
  shopId: string;

  @ApiProperty({
    description: 'Message status',
    example: SubscriberMessageStatus.Sent,
    enum: SubscriberMessageStatus,
  })
  status: SubscriberMessageStatus;
}
