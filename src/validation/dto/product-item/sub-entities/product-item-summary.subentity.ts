import { IsString, IsUUID, IsNumber, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class ProductItemSummaryEntity {
  @IsUUID()
  @ApiProperty({ example: '6f74069a-4dc1-465a-ae6b-dcb664a1d7ee' })
  readonly id: string;

  @IsString()
  @ApiProperty({ example: 'Comfortable Jeans' })
  readonly name: string;

  @IsString()
  @ApiProperty({ example: 'Comfortable and durable.' })
  readonly descriptionShort: string;

  @IsNumber()
  @ApiProperty({ example: 60 })
  readonly price: number;

  @IsUrl()
  @ApiProperty({ example: 'https://example.com/image.jpg' })
  readonly imageUrl?: string;
}

export default ProductItemSummaryEntity;
