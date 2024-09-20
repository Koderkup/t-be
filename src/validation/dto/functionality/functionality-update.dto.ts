import { IsOptional, IsNumber, IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { FunctionalityType } from '@prisma/client';

class FunctionalityUpdateDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'AI',
    description: 'Name of the functionality',
  })
  name?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'Some description',
    description: 'Description of the functionality',
  })
  description?: string;

  @IsOptional()
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'media file',
    required: false,
  })
  mediaUrl?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    example: 399,
    description: 'Price of the functionality',
  })
  price?: number;

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
export default FunctionalityUpdateDto;
