import { Module } from '@nestjs/common';

import { PrismaService } from 'src/services/prisma.service';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { DashboardRepository } from './dashboard.repository';
import { ProductItemModule } from '../product-item/product-item.module';

@Module({
  controllers: [DashboardController],
  providers: [
    DashboardService,
    DashboardRepository,
    PrismaService,
  ],
  imports: [ProductItemModule],
})
export class DashboardModule {}
