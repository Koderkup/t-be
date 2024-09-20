import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsUUID,
  IsArray,
  ValidateNested,
  IsOptional,
  IsEnum,
  ArrayMaxSize,
  MinLength,
  IsNumber,
  MaxLength,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ProductPurchaseItem } from '../product-item';
export enum confirmMethodEnum {
  automatic = 'automatic',
  manual = 'manual',
}


//For a prototype there is no point in recording all the fields
//https://docs.stripe.com/api/payment_intents/create

export class PaymentMethods {
  @IsBoolean()
  @ApiProperty({ example: true })
  enabled: boolean;
}
//implements Stripe.PaymentIntentCreateParams
export class StripePurchaseDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty({ example: 'usd' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(3)
  @ApiProperty({ example: 200 })
  currency: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => PaymentMethods)
  automatic_payment_methods: PaymentMethods;

  @IsString()
  payment_method: string;
  @IsEnum(confirmMethodEnum)
  confirmation_method: string;
  @IsBoolean()
  @ApiProperty({ example: true })
  confirm: boolean;
}
export class CustomizedStripePurchaseDto extends StripePurchaseDto {
  products: ProductPurchaseItem[];
}
