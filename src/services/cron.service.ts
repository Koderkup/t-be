import { RecommendationService } from '@modules/recommendation/recommendation.service';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from './prisma.service';
import calculateProductPopularity from '@helpers/calculateProductPopularity';
import { CustomLoggerService } from '@root/logger/custom-logger.service';

@Injectable()
export class CronService {
  constructor(
    private readonly recommendationService: RecommendationService,
    private readonly prisma: PrismaService,
    private readonly logger: CustomLoggerService,
  ) {
    logger.setContext(CronService.name);
  }

  @Cron(CronExpression.EVERY_WEEK)
  async weeklyUpdate() {
    this.updatePopularity();
    this.updateRecommendations();
  }

  async updateRecommendations() {
    this.logger.log('Start update recommendations');
    const shops = await this.prisma.shop.findMany({
      where: {
        functionalities: {
          some: {
            type: 'AIRecommendations',
          },
        },
      },
      include: {
        products: {
          select: {
            id: true,
            name: true,
            descriptionShort: true,
            categoryType: {
              select: {
                name: true,
                subcategories: true,
              },
            },
            colors: true,
            popularity: true,
          },
        },
      },
    });

    await Promise.all(
      shops.map((shop) =>
        this.recommendationService.updateRecommendations(
          shop.products,
          shop.id,
        ),
      ),
    );
    this.logger.log('Recommendations updated');
  }

  async updatePopularity() {
    this.logger.log('Start update products popularity');
    const currentDate = new Date();

    const products = await this.prisma.productItem.findMany({
      select: {
        id: true,
        Comment: true,
        orderItems: {
          include: {
            order: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });

    await Promise.all(
      products.map(async (product) => {
        const popularity = calculateProductPopularity(product, currentDate);

        await this.prisma.productItem.update({
          where: { id: product.id },
          data: {
            popularity,
          },
        });
      }),
    );

    this.logger.log('Products popularity updated');
  }
}
