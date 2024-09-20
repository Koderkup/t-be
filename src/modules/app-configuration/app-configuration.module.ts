import { Module } from '@nestjs/common';
import { AppConfigurationsService } from './app-configuration.service';
import { AppConfigurationsController } from './app-configuration.controller';
import { AppConfigurationsRepository } from './app-configuration.repository';
import { PrismaService } from 'src/services/prisma.service';
import { UploaderModule } from '@modules/uploader/uploader.module';
import { BotModule } from '@modules/bot/bot.module';

@Module({
  imports: [UploaderModule, BotModule],
  controllers: [AppConfigurationsController],
  providers: [
    AppConfigurationsService,
    AppConfigurationsRepository,
    PrismaService,
  ],
  exports: [AppConfigurationsService],
})
export class AppConfigurationsModule {}
