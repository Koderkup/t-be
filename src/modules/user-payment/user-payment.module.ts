import { Module } from '@nestjs/common';
import { UserPaymentService } from './user-payment.service';
import { UserPaymentController } from './user-payment.controller';
import { UserPaymentRepository } from './user-payment.repository';
import { PrismaService } from '@services/prisma.service';

@Module({
  controllers: [UserPaymentController],
  imports: [],
  providers: [
    UserPaymentService,
    UserPaymentRepository,
    PrismaService,
  ],
})
export class UserPaymentModule {}
