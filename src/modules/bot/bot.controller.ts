// src/bot/bot.controller.ts
import { Controller, Post, Param, Req } from '@nestjs/common';
import { Request } from 'express';
import { BotService } from './bot.service';

@Controller('bot')
export class BotController {
  constructor(private readonly botService: BotService) {}

  // Обработка вебхуков для конкретного бота
  @Post(':botToken/webhook')
  async handleWebhook(
    @Param('botToken') botToken: string,
    @Req() req: Request,
  ) {
    const bot = this.botService.getBotByToken(botToken);

    bot.handleUpdate(req.body); // Обработка обновления через Webhook
  }
}
