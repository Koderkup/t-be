import { IsString, IsNumber, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { FunctionalityType } from '@prisma/client';

class FunctionalityCreateDto {
  @IsString()
  @ApiProperty({
    example: 'AI',
    description: 'Name of the functionality',
  })
  name: string;

  @IsString()
  @ApiProperty({
    example: 'Some description',
    description: 'Description of the functionality',
  })
  description: string;

  @IsOptional()
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'media file',
    required: false,
  })
  mediaUrl?: string;

  //@ApiProperty({
  //  example:
  //    '["a1b2c3d4-e5f6-7g8h-9i0j-k11l12m13n14", "a1b2c3d4-e5f6-7g8h-9i0j-k11l12m13n14"]',
  //  description: 'Shop ids',
  //})
  //@IsUUID(undefined, { each: true })
  //shopsId: string[];

  @IsNumber()
  @ApiProperty({
    example: 399,
    description: 'Price of the functionality',
  })
  price: number;

  @IsOptional()
  @IsEnum(FunctionalityType)
  @ApiProperty({
    example: FunctionalityType.AIAssistant,
    description: 'Which type of functionality',
  })
  type?: FunctionalityType | null;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example:
      'Delivery takes 5 days within the EU. We accept credit cards, PayPal and bank transfers.',
    description: 'Common information for openAI chat bot integration',
  })
  infoForAIAssistant?: string;
}

export default FunctionalityCreateDto;
