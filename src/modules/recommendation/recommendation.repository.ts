import { Injectable } from '@nestjs/common';
import { Prisma, SourceType } from '@prisma/client';
import { PrismaService } from '@services/prisma.service';

@Injectable()
export class RecommendationRepository {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.recommendation.findMany();
  }

  async removeManyByShopId(shopId: string) {
    return this.prisma.recommendation.deleteMany({
      where: {
        shopId,
        sourceType: SourceType.AI,
      },
    });
  }

  async createMany(data: Prisma.RecommendationCreateManyInput[]) {
    return this.prisma.recommendation.createMany({ data });
  }
}
