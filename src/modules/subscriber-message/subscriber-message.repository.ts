import { Injectable } from '@nestjs/common';
import { SubscriberMessageStatus } from '@prisma/client';
import { PrismaService } from '@services/prisma.service';
import { CreateSubscriberMessageDto } from '@validation/subscriber-message/dto/create-subscriber-message.dto';
import { UpdateSubscriberMessageDto } from '@validation/subscriber-message/dto/update-subscriber-message.dto';

@Injectable()
export class SubscriberMessageRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    dto: CreateSubscriberMessageDto,
    status: SubscriberMessageStatus,
  ) {
    return this.prisma.subscriberMessage.create({
      data: {
        ...dto,
        status,
      },
    });
  }

  async findAllByShopID(shopId: string) {
    return this.prisma.subscriberMessage.findMany({
      where: { shopId },
    });
  }

  async findOne(id: string, withCustomers: boolean) {
    return this.prisma.subscriberMessage.findUnique({
      where: { id },
      include: {
        shop: withCustomers && {
          include: {
            customers: true,
          },
        },
      },
    });
  }

  async update(id: string, updateDto: UpdateSubscriberMessageDto) {
    return this.prisma.subscriberMessage.update({
      where: {
        id,
      },
      data: updateDto,
    });
  }

  async updateStatus(id: string, status: SubscriberMessageStatus) {
    return this.prisma.subscriberMessage.update({
      where: { id },
      data: {
        status,
      },
    });
  }

  async delete(id: string) {
    return this.prisma.subscriberMessage.delete({ where: { id } });
  }
}
