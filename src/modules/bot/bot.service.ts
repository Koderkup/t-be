import { CurrencyNameMapping } from '@helpers/currency';
import { UploaderService } from '@modules/uploader/uploader.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { FunctionalityType } from '@prisma/client';
import { CustomLoggerService } from '@root/logger/custom-logger.service';
import { OpenAIService } from '@services/openAI.service';
import { PrismaService } from '@services/prisma.service';
import BotMessagesDto from '@validation/app-configuration/bot-messages.dto';
import { Context, Telegraf } from 'telegraf';

@Injectable()
export class BotService {
  private bots: Telegraf[] = [];

  constructor(
    private readonly logger: CustomLoggerService,
    private readonly openAIService: OpenAIService,
    private readonly prisma: PrismaService,
    private readonly uploaderService: UploaderService,
  ) {}

  async getAllBotTokens() {
    return (
      await this.prisma.appConfiguration.findMany({
        select: { botToken: true },
      })
    ).map((config) => config.botToken);
  }

  async findFirst(shopId?: string, botToken?: string) {
    return this.prisma.appConfiguration.findFirst({
      where: {
        shopId,
        botToken,
      },
      include: {
        shop: {
          select: {
            functionalities: true,
          },
        },
      },
    });
  }

  async findConfiguration({
    shopId,
    botToken,
  }: {
    shopId?: string;
    botToken?: string;
  }) {
    const config = await this.findFirst(shopId, botToken);

    const parsedBotMessages: BotMessagesDto | null = config?.botMessages
      ? JSON.parse(config.botMessages.toString())
      : null;

    if (config && config.shopCurrencies) {
      const currenciesWithNames = config.shopCurrencies.map((code) => ({
        value: code,
        label: CurrencyNameMapping[code] || code,
      }));

      return {
        ...config,
        shopCurrencies: currenciesWithNames,
        botMessages: parsedBotMessages,
      };
    }

    return {
      ...config,
      botMessages: parsedBotMessages,
    };
  }

  async initializeBots(): Promise<void> {
    const botsTokens = await this.getAllBotTokens();

    for (const botToken of botsTokens) {
      const bot = new Telegraf(botToken);

      // Настройка Webhook
      const webhookUrl = `${process.env.TG_WEBHOOK_DOMAIN}/bot/${botToken}/webhook`;
      try {
        await this.setWebhookWithRetry(bot, webhookUrl); // Вызов с повторными попытками
      } catch (error) {
        this.logger.error(
          `Failed to set webhook for bot ${botToken}:` + error.toString(),
        );
      }

      bot.start((ctx) => this.handleStart(botToken, ctx));
      bot.on('text', (ctx) => this.handleText(ctx, botToken, bot));
      this.bots.push(bot);
    }
  }

  private async handleText(ctx: Context, botToken: string, bot: Telegraf) {
    const userMessage = ctx.message['text'];
    const config = await this.findConfiguration({ botToken });
    const isFoundFuncWithAI = config.shop.functionalities.find(
      (func) => func.type === FunctionalityType.AIAssistant,
    );

    if (isFoundFuncWithAI !== undefined) {
      const commonInfo = isFoundFuncWithAI.infoForAIAssistant;

      try {
        const response = await this.openAIService.generateAssistantAnswer(
          commonInfo,
          userMessage,
        );

        if (this.isUncertainResponse(response)) {
          await this.forwardToSpecialist(ctx, config.forwardingId, bot);
        } else {
          ctx.reply(response);
        }
      } catch (error) {
        await this.forwardToSpecialist(ctx, config.forwardingId, bot);
      }
    }
  }

  async changeBot({
    botToken,
    description,
    name,
    mediaUrl,
  }: {
    botToken: string;
    description?: string;
    name?: string;
    mediaUrl?: string;
  }) {
    try {
      const bot = this.getBotByToken(botToken);
      if (description) await bot.telegram.setMyDescription(description);
      if (name) await bot.telegram.setMyName(name);
      const id = (await bot.telegram.getMe()).id;
      if (mediaUrl) {
        const url = await this.uploaderService.getMediaUrlByKey(mediaUrl);
        await bot.telegram.setChatPhoto(id, { url });
      }
    } catch (error) {
      this.logger.error(error);
    }
  }

  private isUncertainResponse(response: string): boolean {
    const uncertainKeywords = ['better to ask a specialist', 'not sure'];

    return uncertainKeywords.some((keyword) =>
      response.toLowerCase().includes(keyword),
    );
  }

  private async forwardToSpecialist(
    ctx: Context,
    chatId: string,
    bot: Telegraf,
  ) {
    ctx.reply('The question has been forwarded to a specialist. Please wait.');

    try {
      await this.sendMessage({
        telegramId: chatId,
        bot,
        text: `A message has been received in the chat @${ctx.botInfo.username} from ${ctx.message.from.first_name} ${ctx.message.from.last_name} @${ctx.message.from.username} that chatgpt cannot respond to. Question: ${ctx.message['text']}`,
      });
    } catch (error) {
      this.logger.error(error);
    }
  }

  private async handleStart(botToken: string, ctx: Context) {
    const config = await this.findConfiguration({ botToken });
    const botMessages: BotMessagesDto | null = config.botMessages
      ? JSON.parse(config.botMessages.toString())
      : null;

    if (config.mediaUrl) await ctx.sendPhoto(config.mediaUrl);

    // TODO: commented for mocked url
    // if (botMessages?.welcome || config.url)
    await ctx.sendMessage(
      botMessages?.welcome || 'Click the button below to open app:',
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: 'Open app',
                // TODO: mocked url
                web_app: {
                  url: `${process.env.APP_CONFIG_URL}${config.shopId}`,
                },
              },
            ],
          ],
        },
      },
    );
  }

  // Метод с повторной попыткой установки Webhook
  private async setWebhookWithRetry(
    bot: Telegraf,
    url: string,
    retries = 5,
    delay = 1000,
  ): Promise<void> {
    let attempt = 0;
    while (attempt < retries) {
      try {
        await bot.telegram.setWebhook(url);
        this.logger.log(`Webhook set successfully for bot at ${url}`);
        return;
      } catch (error) {
        if (
          error.code === 429 &&
          error.parameters &&
          error.parameters.retry_after
        ) {
          const retryAfter = error.parameters.retry_after * 1000; // Время ожидания в миллисекундах
          this.logger.warn(`Rate limit hit, retrying after ${retryAfter} ms`);
          await this.delay(retryAfter);
        } else {
          this.logger.error(
            `Failed to set webhook (attempt ${attempt + 1}):` +
              error.toString(),
          );
          await this.delay(delay); // Ожидание между попытками
        }
      }
      attempt++;
    }
    throw new Error(`Failed to set webhook after ${retries} attempts`);
  }

  // Вспомогательная функция задержки
  private delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  getBotByToken(token: string): Telegraf | undefined {
    const botEntry = this.bots.find((entry) => entry.telegram.token === token);
    return botEntry ? botEntry : undefined;
  }

  private async sendMessage({
    telegramId,
    bot,
    text,
    mediaUrl,
  }: {
    telegramId: string;
    bot: Telegraf;
    text?: string;
    mediaUrl?: string;
  }) {
    try {
      if (text) await bot.telegram.sendMessage(telegramId, text);

      if (mediaUrl) await bot.telegram.sendPhoto(telegramId, mediaUrl);
    } catch (error) {
      this.logger.error(error);
    }
  }

  async sendConfirmOrderMessage(customerId: string, shopId: string) {
    const config = await this.findConfiguration({ shopId });
    const confirmOrderMessage = config.botMessages?.confirmOrder;
    const bot = this.getBotByToken(config.botToken);

    if (confirmOrderMessage)
      await this.sendMessage({
        telegramId: customerId,
        bot,
        text: confirmOrderMessage,
      });
  }

  async sendOrderChanges(text: string, shopId: string) {
    const config = await this.findConfiguration({ shopId });
    const { forwardingId } = config;
    const bot = this.getBotByToken(config.botToken);

    this.sendMessage({ telegramId: forwardingId, bot, text });
  }

  async sendMessageToMany(
    usersTelegramId: string[],
    botToken: string,
    text?: string,
    mediaUrl?: string,
  ) {
    if (text || mediaUrl) {
      const bot = this.getBotByToken(botToken);

      Promise.all(
        usersTelegramId.map((telegramId) =>
          this.sendMessage({ telegramId, text, mediaUrl, bot }),
        ),
      );
    } else {
      throw new BadRequestException(
        'Nothing to send: Both text and mediaUrl are missing.',
      );
    }
  }
}
