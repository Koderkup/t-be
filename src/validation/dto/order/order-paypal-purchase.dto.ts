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
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import * as paypal from '@paypal/checkout-server-sdk';
import { ProductPurchaseItem } from '../product-item';
export enum IntentEnum {
  CAPTURE = 'CAPTURE',
  AUTHORIZE = 'AUTHORIZE',
}
export class PaymentSource {
  paypal: Paypal;
}

export class Paypal {
  experience_context: ExperienceContext;
}

export class ExperienceContext {
  payment_method_preference: string;
  brand_name: string;
  locale: string;
  landing_page: string;
  shipping_preference: string;
  user_action: string;
  return_url: string;
  cancel_url: string;
}
//For a prototype there is no point in recording all the fields
//https://developer.paypal.com/docs/api/orders/v2/#orders_create

//implements paypal.orders.OrdersCreateRequest
export class PaypalPurchaseDto {
  //@IsEnum(IntentEnum)
  //@IsNotEmpty()
  //intent: IntentEnum;

  @ArrayMaxSize(10)
  @ValidateNested({ each: true })
  @Type(() => PurchaseUnit)
  purchase_units: PurchaseUnit[];

  //@ValidateNested({ each: true })
  //@Type(() => PaymentSource)
  //payment_source: PaymentSource;
}
export class Amount {
  @ApiProperty({ example: 'USD' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(3)
  currency_code: string;
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  @ApiProperty({ example: '100.00' })
  value: string;
}
export class PurchaseUnit {
  //@IsString()
  //@MinLength(1)
  //@MaxLength(256)
  //@IsNotEmpty()
  //reference_id: string;

  //@IsString()
  //@IsOptional()
  //@MinLength(1)
  //@MaxLength(127)
  //@IsNotEmpty()
  //description: string;

  //@IsString()
  //@IsOptional()
  //@MinLength(1)
  //@MaxLength(127)
  //@IsNotEmpty()
  //custom_id: string;

  //@IsString()
  //@IsOptional()
  //@MinLength(1)
  //@MaxLength(127)
  //@IsNotEmpty()
  //invoice_id: string;

  //@IsString()
  //@IsOptional()
  //@MinLength(1)
  //@MaxLength(22)
  //@IsNotEmpty()
  //soft_descriptor: string;

  @ValidateNested({ each: true })
  @Type(() => Amount)
  amount: Amount;
}
export class CustomizedPaypalPurchaseDto extends PaypalPurchaseDto {
  products: ProductPurchaseItem[];
}
