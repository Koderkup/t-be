import { Module } from '@nestjs/common';
import { SegmentService } from './segment.service';
import { SegmentController } from './segment.controller';
import { PrismaService } from 'src/services/prisma.service';
import { SegmentItemRepository } from './segment.repository';
import { ShopService } from '../shop/shop.service';
import { BotModule } from '@modules/bot/bot.module';

@Module({
  imports: [BotModule],
  controllers: [SegmentController],
  providers: [
    SegmentService,
    SegmentItemRepository,
    PrismaService,
    ShopService,
  ],
})
export class SegmentModule {}
