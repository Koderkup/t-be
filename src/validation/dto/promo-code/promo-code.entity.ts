import { ApiProperty } from '@nestjs/swagger';

class PromoCodeEntity {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID of the shop',
  })
  shopId: string;

  @ApiProperty({
    example: 'uuid-1234-5678',
    description: 'Unique identifier of the promo code',
  })
  id: string;

  @ApiProperty({
    example: '20OFF',
    description: 'Promo code string used at checkout',
  })
  code: string;

  @ApiProperty({
    example: 20,
    description: 'Discount percentage provided by the promo code',
  })
  discount: number;

  @ApiProperty({
    example: true,
    description: 'Status indicating whether the promo code is active',
  })
  isActive: boolean;

  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
    description: 'Start date from which the promo code is valid',
  })
  startDate: Date;

  @ApiProperty({
    example: '2024-12-31T23:59:59.000Z',
    description: 'End date until which the promo code is valid',
  })
  endDate: Date;
}

export default PromoCodeEntity;
