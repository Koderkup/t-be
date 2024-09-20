import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { createTransport, Transporter } from 'nodemailer';
import { AppConfigurationsRepository } from './app-configuration.repository';
import {
  AppConfigurationCreateDto,
  AppConfigurationEntity,
  AppConfigurationUpdateDto,
} from '@validation/app-configuration/';
import { CurrencyNameMapping } from 'src/helpers/currency';
import { ONE_WEEK_IN_SECOND } from '@root/constants/uploader.constant';
import { RedisService } from '@modules/redis/redis.service';
import { IRedisLog, MsgType } from '@interfaces/redis-logs.interface';
import BotMessagesDto from '@validation/app-configuration/bot-messages.dto';
import { BotService } from '@modules/bot/bot.service';

@Injectable()
export class AppConfigurationsService implements OnModuleInit {
  private transporter: Transporter | null = null;
  private cachedCredentials: { email: string; password: string } | null = null;

  constructor(
    private repository: AppConfigurationsRepository,
    private readonly redis: RedisService,
    private readonly botService: BotService,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.repository.ensureDefaultConfiguration();
  }

  private async setupTransporter() {
    const config = await this.repository.findFirst();
    if (!config || !config.email || !config.emailPassword) {
      throw new Error('Email credentials not configured properly.');
    }

    if (
      this.cachedCredentials &&
      this.cachedCredentials.email === config.email &&
      this.cachedCredentials.password === config.emailPassword
    ) {
      return this.transporter;
    }

    this.cachedCredentials = {
      email: config.email,
      password: config.emailPassword,
    };

    this.transporter = createTransport({
      host: 'smtp.example.com',
      port: 587,
      secure: false,
      auth: {
        user: config.email,
        pass: config.emailPassword,
      },
    });
  }

  async getAllBotTokens() {
    return (await this.repository.getAllBotTokens()).map(
      (config) => config.botToken,
    );
  }

  async findConfiguration({
    shopId,
    botToken,
  }: {
    shopId?: string;
    botToken?: string;
  }) {
    const config = await this.repository.findFirst(shopId, botToken);

    const parsedBotMessages: BotMessagesDto | null = config.botMessages
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

  async updateConfiguration(
    data: AppConfigurationUpdateDto,
    shopId?: string,
  ): Promise<AppConfigurationEntity> {
    if (data.emailPassword) {
      const hashedPassword = await bcrypt.hash(data.emailPassword, 10);
      data.emailPassword = hashedPassword;
    }

    const botMessagesJson = data.botMessages
      ? JSON.stringify(data.botMessages)
      : null;

    const updatedConfig = await this.repository.update(
      {
        data: {
          ...data,
          botMessages: botMessagesJson,
        },
      },
      shopId,
    );

    const parsedBotMessages: BotMessagesDto | null = updatedConfig.botMessages
      ? JSON.parse(updatedConfig.botMessages.toString())
      : null;

    return {
      ...updatedConfig,
      botMessages: parsedBotMessages,
    };
  }

  async getEmailCredentials() {
    const config = await this.repository.findFirst();
    return { email: config?.email, passwordHash: config?.emailPassword };
  }

  async sendMail(to: string, subject: string, text: string) {
    const transporter = await this.setupTransporter();
    if (!transporter) {
      throw new Error('Transporter is not set up.');
    }

    await transporter.sendMail({
      from: this.cachedCredentials.email,
      to: to,
      subject: subject,
      text: text,
    });
  }

  async sendUserInputEmail(
    userInput: {
      name: string;
      email: string;
      text: string;
    },
    shopId: string,
  ): Promise<string> {
    const { name, email, text } = userInput;
    const subject = 'Support';
    const extendedText = `Message from ${name} (${email}): ${text}`;

    const config = await this.repository.findFirst();
    if (!config || !config.email) {
      throw new Error('Configuration email not set');
    }

    await this.sendMail(config.email, subject, extendedText);

    const timestamp = new Date().getTime();
    const redis_record_key = `${shopId}__anonymous__${timestamp}`;
    const log: IRedisLog = {
      timestamp,
      msgType: MsgType.INFO,
      message: `Message from ${name} with email ${email}`,
    };
    await this.redis.set(redis_record_key, log, ONE_WEEK_IN_SECOND);
    return 'Email sent successfully';
  }

  async create(args: AppConfigurationCreateDto) {
    const { shopId } = args;

    if (shopId) {
      const shopExists = await this.repository.findShopById(shopId);

      if (!shopExists)
        throw new NotFoundException(`Shop with ID ${shopId} not found`);

      await this.repository.checkUniqueShopId(shopId);
    }

    const config = await this.repository.create(args);

    await this.botService.initializeBots();

    return config;
  }
}
