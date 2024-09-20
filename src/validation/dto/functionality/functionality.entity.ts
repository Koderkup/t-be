import { ApiProperty } from '@nestjs/swagger';
import { FunctionalityType } from '@prisma/client';
class FunctionalityEntity {
  @ApiProperty({
    example: 'a1b2c3d4-e5f6-7g8h-9i0j-k11l12m13n14',
    description: 'Functionality id',
  })
  id?: number;

  @ApiProperty({
    example: 'AI',
    description: 'Name of the functionality',
  })
  name?: string;

  @ApiProperty({
    example: 'Some description',
    description: 'Description of the functionality',
  })
  description?: string;

  @ApiProperty({
    example:
      '["a1b2c3d4-e5f6-7g8h-9i0j-k11l12m13n14", "a1b2c3d4-e5f6-7g8h-9i0j-k11l12m13n14"]',
    description: 'Shop ids',
  })
  shopsId?: string[];

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'media file',
    required: false,
  })
  mediaUrl?: string;

  @ApiProperty({
    example: 399,
    description: 'Price of the functionality',
  })
  price?: number;

  @ApiProperty({
    example: FunctionalityType.AIAssistant,
    description: 'Which type of functionality',
  })
  type?: FunctionalityType | null;

  @ApiProperty({
    example:
      'Delivery takes 5 days within the EU. We accept credit cards, PayPal and bank transfers.',
    description: 'Common information for openAI chat bot integration',
  })
  infoForAIAssistant?: string;
}

export default FunctionalityEntity;
