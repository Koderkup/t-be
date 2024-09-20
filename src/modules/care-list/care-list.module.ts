import { Module } from '@nestjs/common';
import { CareListService } from './care-list.service';
import { CareListController } from './care-list.controller';
import { CareListRepository } from './care-list.repository';
import { PrismaService } from 'src/services/prisma.service';

@Module({
  controllers: [CareListController],
  providers: [CareListService, CareListRepository, PrismaService],
})
export class CareListModule {}
