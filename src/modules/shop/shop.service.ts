import { BotService } from '@modules/bot/bot.service';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import BotMessagesDto from '@validation/app-configuration/bot-messages.dto';
import { PrismaService } from 'src/services/prisma.service';
import {
  ShopEntity,
  UpdateShopDto,
  CreateShopDto,
} from 'src/validation/dto/shop';

@Injectable()
export class ShopService {
  constructor(
    private prisma: PrismaService,
    private botService: BotService,
  ) {}

  async create(data: CreateShopDto): Promise<ShopEntity> {
    //const { userId, configuration, design, designId, ...rest } = data;
    //const createDto: Prisma.ShopCreateInput = {
    //  ...rest,
    //  user: {
    //    connect: { id: userId },
    //  },
    //  design: undefined,
    //};
    //if (designId){
    //  createDto.design.connect = { id: designId };
    //} else {
    //  if(designId){
    //    createDto.design = { create: {
    //      ...design,
    //    }};
    //  }
    //}
    //if (configuration) {
    //  createDto.configuration = {
    //    create: {
    //      ...configuration,
    //    },
    //  };
    //}
    return this.prisma.shop.create({
      data,
    });
  }

  async findAll(userId: string): Promise<ShopEntity[]> {
    return this.prisma.shop.findMany({
      where: {
        userId,
      },
    });
  }

  async findOne(id: string): Promise<ShopEntity> {
    const shop = await this.prisma.shop.findUnique({
      where: { id },
      include: {
        functionalities: true,
        user: true,
        design: true,
        configuration: true,
      },
    });
    if (!shop) {
      throw new NotFoundException(`Shop with ID ${id} not found`);
    }

    const botMessages: BotMessagesDto | null = shop.configuration?.botMessages
      ? JSON.parse(shop.configuration.botMessages.toString())
      : undefined;

    return {
      ...shop,
      configuration: shop.configuration
        ? {
            ...shop.configuration,
            botMessages,
          }
        : null,
    };
  }

  async update(id: string, data: UpdateShopDto) {
    const {
      userId,
      configuration,
      designId,
      functionalityIds,
      inDraft,
      ...rest
    } = data;

    const updateDto: Prisma.ShopUpdateInput = {
      ...rest,
      inDraft: inDraft ? JSON.parse(inDraft.toString()) : undefined,

      configuration: configuration && {
        update: {
          ...configuration,
          botMessages: JSON.stringify(configuration.botMessages),
          mediaUrl: configuration.mediaUrl.toString(),
        },
      },
      functionalities: {
        connect: functionalityIds
          ? JSON.parse(functionalityIds?.toString())?.map((id) => ({ id }))
          : undefined,
      },
    };

    if (designId) {
      updateDto.design = {
        disconnect: true,
        connect: { id: designId || undefined },
      };
    }

    if (userId) {
      updateDto.user = {
        disconnect: true,
        connect: { id: userId || undefined },
      };
    }

    const shop = await this.prisma.shop.update({
      where: { id },
      data: updateDto,
      include: {
        configuration: true,
      },
    });
    if (!shop) {
      throw new NotFoundException(`Shop with ID ${id} not found`);
    }

    this.botService.changeBot({
      botToken: shop.configuration?.botToken,
      description: shop.description,
      name: shop.name,
      mediaUrl: shop.mediaUrl,
    });

    return shop;
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.prisma.userPayment.deleteMany({
      where: { shopId: id },
    });

    await this.prisma.promotionalBlock.deleteMany({
      where: { shopId: id },
    });

    await this.prisma.careList.deleteMany({
      where: { shopId: id },
    });

    await this.prisma.color.deleteMany({
      where: { shopId: id },
    });

    await this.prisma.size.deleteMany({
      where: { shopId: id },
    });

    await this.prisma.shop.delete({ where: { id } }).catch((err) => {
      throw new ForbiddenException(err);
    });

    return;
  }
}
