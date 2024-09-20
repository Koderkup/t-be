// src/bot/bot.module.ts
import { Module, OnModuleInit } from '@nestjs/common';
import { BotService } from './bot.service';
import { CustomLoggerModule } from '@root/logger/custom-logger.module';
import { BotController } from './bot.controller';
import { OpenAIService } from '@services/openAI.service';
import { PrismaService } from '@services/prisma.service';
import { UploaderModule } from '@modules/uploader/uploader.module';

@Module({
  imports: [CustomLoggerModule, UploaderModule],
  controllers: [BotController],
  providers: [BotService, OpenAIService, PrismaService],
  exports: [BotService],
})
export class BotModule implements OnModuleInit {
  constructor(private readonly botService: BotService) {}

  // Инициализируем ботов при запуске приложения
  async onModuleInit() {
    await this.botService.initializeBots();
  }
}
