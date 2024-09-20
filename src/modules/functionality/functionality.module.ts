import { Module } from '@nestjs/common';
import { FunctionalityService } from './functionality.service';
import { FunctionalityController } from './functionality.controller';
import { FunctionalityRepository } from './functionality.repository';
import { PrismaService } from '@services/prisma.service';
import { UploaderModule } from '@modules/uploader/uploader.module';

@Module({
  imports: [UploaderModule],
  controllers: [FunctionalityController],
  providers: [FunctionalityService, FunctionalityRepository, PrismaService],
})
export class FunctionalityModule {}
