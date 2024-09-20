import { ApiProperty } from '@nestjs/swagger';

class DesignEntity {
  @ApiProperty({
    example: 'Paris',
    description: 'Name of the color',
  })
  name?: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'media file',
    required: false,
  })
  mediaUrl?: string;

  @ApiProperty({
    example: 'Red',
    description: 'Some Color',
  })
  color?: string;

  @ApiProperty({
    example: 'Red',
    description: 'Some font style',
  })
  font_style?: string;

  @ApiProperty({ example: 299, description: 'Price of design' })
  price?: number;

  @ApiProperty({ example: 'Light', description: 'Theme of design' })
  theme?: 'Dark' | 'Light' | 'Automatic';

  @ApiProperty({
    example: 'Red',
    description: 'Some highlight color',
  })
  highlightColor?: string;

  @ApiProperty({ example: 12.5, description: 'Text size' })
  textSize?: number;

  @ApiProperty({
    example: 'Red',
    description: 'Some design description',
  })
  description?: string;

  @ApiProperty({
    example: ['Light', 'Classic'],
    description: 'Design tags array',
  })
  tags?: string[];
}

export default DesignEntity;
