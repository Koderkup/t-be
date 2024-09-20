import { Module } from '@nestjs/common';
import { SubscriberMessageService } from './subscriber-message.service';
import { SubscriberMessageController } from './subscriber-message.controller';
import { SubscriberMessageRepository } from './subscriber-message.repository';
import { UploaderModule } from '@modules/uploader/uploader.module';
import { PrismaService } from '@services/prisma.service';
import { BotModule } from '@modules/bot/bot.module';
import { AppConfigurationsModule } from '@modules/app-configuration/app-configuration.module';

@Module({
  imports: [UploaderModule, BotModule, AppConfigurationsModule],
  controllers: [SubscriberMessageController],
  providers: [
    SubscriberMessageService,
    SubscriberMessageRepository,
    PrismaService,
  ],
})
export class SubscriberMessageModule {}
