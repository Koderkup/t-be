import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { PrismaService } from 'src/services/prisma.service';
import { UploaderModule } from '@modules/uploader/uploader.module';
import { BotModule } from '@modules/bot/bot.module';

@Module({
  imports: [UploaderModule, BotModule],
  controllers: [ShopController],
  providers: [ShopService, PrismaService],
})
export class ShopModule {}
