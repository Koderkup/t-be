import { Module } from '@nestjs/common';
import { RecommendationService } from './recommendation.service';
import { RecommendationRepository } from './recommendation.repository';
import { PrismaService } from '@services/prisma.service';
import { OpenAIService } from '@services/openAI.service';

@Module({
  providers: [
    RecommendationService,
    RecommendationRepository,
    PrismaService,
    OpenAIService,
  ],
  exports: [RecommendationService],
})
export class RecommendationModule {}
