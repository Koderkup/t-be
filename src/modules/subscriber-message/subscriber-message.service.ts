import { Injectable } from '@nestjs/common';
import { CreateSubscriberMessageDto } from '../../validation/dto/subscriber-message/dto/create-subscriber-message.dto';
import { SubscriberMessageRepository } from './subscriber-message.repository';
import { BotService } from '@modules/bot/bot.service';
import { SubscriberMessageStatus } from '@prisma/client';
import { UpdateSubscriberMessageDto } from '@validation/subscriber-message/dto/update-subscriber-message.dto';
import { AppConfigurationsService } from '@modules/app-configuration/app-configuration.service';

@Injectable()
export class SubscriberMessageService {
  constructor(
    private readonly repository: SubscriberMessageRepository,
    private readonly botService: BotService,
    private readonly appConfigService: AppConfigurationsService,
  ) {}

  async create(createSubscriberMessageDto: CreateSubscriberMessageDto) {
    return this.repository.create(
      createSubscriberMessageDto,
      SubscriberMessageStatus.Pending,
    );
  }

  async findAllByShopID(shopId: string) {
    return this.repository.findAllByShopID(shopId);
  }

  async findOne(id: string, withCustomers = false) {
    return this.repository.findOne(id, withCustomers);
  }

  async update(id: string, updateDto: UpdateSubscriberMessageDto) {
    return this.repository.update(id, updateDto);
  }

  async sendMessage(id: string) {
    const message = await this.findOne(id, true);

    const customersId = message.shop.customers.map(
      (customer) => customer.telegramID,
    );

    const config = await this.appConfigService.findConfiguration({
      shopId: message.shopId,
    });

    await this.botService.sendMessageToMany(
      customersId,
      config.botToken,
      message.message,
      message.mediaUrl,
    );

    return this.repository.updateStatus(id, SubscriberMessageStatus.Sent);
  }

  async delete(id: string) {
    await this.repository.delete(id);
  }
}
