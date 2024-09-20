import { ApiProperty } from '@nestjs/swagger';
import { Currency, PaymentType } from '@prisma/client';
import { IsOptional, IsNumber, IsIn, IsString, IsUUID } from 'class-validator';

class UserPaymentCreateDto {
  @IsString()
  @ApiProperty({ example: 'David Beast', description: 'Payment Identifier' })
  paymentIdentifier: string;

  @ApiProperty({ example: 'stripe', description: 'Payment Type' })
  @IsIn(['stripe', 'ton'])
  paymentMethod: PaymentType;

  @ApiProperty({ example: 20, description: 'total price' })
  @IsNumber()
  totalPrice: number;

  @IsOptional()
  @ApiProperty({ example: 'USD' })
  currency: Currency;

  @ApiProperty({ example: [] })
  @IsNumber({}, { each: true })
  functionalityIds: number[];

  @IsUUID()
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID of the shop',
  })
  shopId: string;

  @IsUUID()
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID of the user',
  })
  userId: string;

  @IsNumber()
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID of the design',
  })
  designId: number;
}

export default UserPaymentCreateDto;
