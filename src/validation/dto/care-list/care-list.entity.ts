import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsUUID, IsOptional } from 'class-validator';
import ProductItemSummaryDto from './product-item-summary.dto';

class CareListEntity {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID of the shop',
  })
  shopId: string;

  @ApiProperty({
    description: 'ID of an care list points',
    example: 'a1b2c3d4-e5f6-7g8h-9i0j-k11l12m13n14',
    type: String,
  })
  @IsUUID('4')
  readonly id: string;

  @ApiProperty({
    description: 'Name of the care list',
    example: 'Title 1',
  })
  @IsString()
  readonly name: string;

  @IsArray()
  @IsOptional()
  @ApiProperty({ type: [ProductItemSummaryDto] })
  readonly recommendations?: ProductItemSummaryDto[];

  @ApiProperty({
    description: 'Text content for the care list',
    example: '<p>This is some HTML content.</p>',
  })
  @IsString()
  readonly text: string;
}

export default CareListEntity;
