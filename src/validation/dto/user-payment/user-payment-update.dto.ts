import { ApiProperty } from '@nestjs/swagger';
import { Currency, PaymentType } from '@prisma/client';
import { IsOptional, IsNumber, IsIn, IsString, IsUUID } from 'class-validator';
class UserPaymentUpdateDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'David Beast', description: 'Payment Identifier' })
  paymentIdentifier: string;

  @IsOptional()
  @ApiProperty({ example: 'stripe', description: 'Payment Type' })
  @IsIn(['stripe', 'ton'])
  paymentMethod: PaymentType;

  @ApiProperty({ example: 20, description: 'total price' })
  @IsOptional()
  @IsNumber()
  totalPrice: number;

  @IsOptional()
  @ApiProperty({ example: 'USD' })
  currency: Currency;

  @IsOptional()
  @ApiProperty({ example: [] })
  @IsNumber({}, { each: true })
  functionalityIds: number[];

  @IsOptional()
  @IsUUID()
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID of the shop',
  })
  shopId: string;

  @IsOptional()
  @IsUUID()
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID of the user',
  })
  userId: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID of the design',
  })
  designId: number;
}

export default UserPaymentUpdateDto;
