import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { AppConfiguration, Prisma } from '@prisma/client';
import { AppConfigurationCreateDto } from '@validation/app-configuration';

@Injectable()
export class AppConfigurationsRepository {
  constructor(private prisma: PrismaService) {}

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

  async create(data: AppConfigurationCreateDto) {
    return this.prisma.appConfiguration.create({ data });
  }

  async ensureDefaultConfiguration(): Promise<void> {
    const configExists = await this.findFirst();
    if (!configExists) {
      const shop = await this.prisma.shop.findFirst();
      await this.prisma.appConfiguration.create({
        data: {
          shop: { connect: { id: shop.id || undefined } },
          location: 'default',
          phoneNumber: 'default',
          email: 'default@email.con',
          botToken: 'token',
          country: 'Bahamas',
        },
      });
    }
  }

  async update(
    params: {
      data: Prisma.AppConfigurationUpdateInput;
    },
    shopId?: string,
  ): Promise<AppConfiguration> {
    const { data } = params;
    const appConfiguration = await this.findFirst(shopId);
    return this.prisma.appConfiguration.update({
      where: { id: appConfiguration.id },
      data: {
        ...data,
        mediaUrl: data.mediaUrl?.toString(),
      },
    });
  }

  async findShopById(id: string): Promise<boolean> {
    const shop = await this.prisma.shop.findUnique({
      where: { id },
    });
    return !!shop;
  }

  async checkUniqueShopId(shopId: string) {
    const existingShopId = await this.prisma.appConfiguration.findUnique({
      where: { shopId },
    });

    if (existingShopId)
      throw new ConflictException(`Shop ID ${shopId} is already in use`);
  }

  async getAllBotTokens() {
    return this.prisma.appConfiguration.findMany({
      select: { botToken: true },
    });
  }
}
