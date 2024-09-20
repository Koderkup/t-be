import { Module } from '@nestjs/common';
import { PromoCodeController } from './promo-code.controller';
import { PromoCodeService } from './promo-code.service';
import { PromoCodeRepository } from './promo-code.repository';
import { PrismaService } from 'src/services/prisma.service';
import { PromoCodeGuard } from './promo-code.guard';

@Module({
  controllers: [PromoCodeController],
  providers: [
    PromoCodeService,
    PromoCodeRepository,
    PrismaService,
    PromoCodeGuard,
  ],
})
export class PromoCodeModule {}
