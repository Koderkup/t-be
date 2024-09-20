import { Module } from '@nestjs/common';

import { PrismaService } from 'src/services/prisma.service';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderRepository } from './order.repository';
import { StripeService } from 'src/services/payment/stripe.service';
import { PaypalService } from 'src/services/payment/paypal.service';
import { ProductItemModule } from '../product-item/product-item.module';
import { BotModule } from '@modules/bot/bot.module';

@Module({
  controllers: [OrderController],
  providers: [
    OrderService,
    OrderRepository,
    PrismaService,
    StripeService,
    PaypalService,
  ],
  imports: [ProductItemModule, BotModule],
})
export class OrderModule {}
