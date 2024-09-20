import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { StatisticsRepository } from './statistics.repository';
import { PrismaService } from 'src/services/prisma.service';

// TODO: 4) Website Traffic: Number of visitors, page views, and bounce rate to evaluate online presence effectiveness.
// TODO: 5) Conversion Rate: Percentage of website visitors who make a purchase, a key metric for e-commerce efficiency.
@Module({
  controllers: [StatisticsController],
  providers: [StatisticsService, StatisticsRepository, PrismaService],
})
export class StatisticsModule {}
