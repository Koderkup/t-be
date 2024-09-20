import { ApiProperty } from '@nestjs/swagger';
import { Currency, PaymentType } from '@prisma/client';

class UserPaymentEntity {
  @ApiProperty({ example: 'David Beast', description: 'Payment Identifier' })
  paymentIdentifier: string;

  @ApiProperty({ example: 'stripe', description: 'Payment Type' })
  paymentMethod: PaymentType;

  @ApiProperty({ example: 20, description: 'total price' })
  totalPrice: number;

  @ApiProperty({ example: 'USD' })
  currency?: Currency;

  @ApiProperty({ example: [] })
  functionalityIds: number[];

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID of the shop',
  })
  shopId: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID of the user',
  })
  userId: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID of the design',
  })
  designId: string;
}

export default UserPaymentEntity;
