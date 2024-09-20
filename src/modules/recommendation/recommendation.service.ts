import { Injectable } from '@nestjs/common';
import { RecommendationRepository } from './recommendation.repository';
import { OpenAIService } from '@services/openAI.service';
import { SourceType } from '@prisma/client';
import { ProductItemForRecommendation } from '@root/types/productItem/types';

@Injectable()
export class RecommendationService {
  constructor(
    private readonly repository: RecommendationRepository,
    private readonly openAIService: OpenAIService,
  ) {}

  async findAll() {
    return this.repository.findAll();
  }

  async updateRecommendations(
    products: ProductItemForRecommendation[],
    shopId: string,
  ) {
    const recommendations =
      await this.openAIService.generateAllRecommendations(products);

    const recommendationEntities = recommendations
      .filter((rec) => rec && rec.recommendationsIds)
      .flatMap((rec) =>
        rec.recommendationsIds.map((recItemId) => ({
          productItemId: rec.productItemId,
          recommendedItemId: recItemId,
          shopId,
          sourceType: SourceType.AI,
        })),
      );

    await this.repository.removeManyByShopId(shopId);

    await this.repository.createMany(recommendationEntities);
  }
}
