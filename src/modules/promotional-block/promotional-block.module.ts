import { Module } from '@nestjs/common';
import { PromotionalBlockService } from './promotional-block.service';
import { PromotionalBlockController } from './promotional-block.controller';
import { PromotionalBlockRepository } from './promotional-block.repository';
import { PrismaService } from 'src/services/prisma.service';
import { UploaderModule } from '@modules/uploader/uploader.module';

@Module({
  controllers: [PromotionalBlockController],
  imports: [UploaderModule],
  providers: [
    PromotionalBlockService,
    PromotionalBlockRepository,
    PrismaService,
  ],
})
export class PromotionalBlockModule {}
