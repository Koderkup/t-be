import { Module } from '@nestjs/common';
import { DesignService } from './design.service';
import { DesignController } from './design.controller';
import { DesignRepository } from './design.repository';
import { PrismaService } from '@services/prisma.service';
import { UploaderModule } from '@modules/uploader/uploader.module';

@Module({
  controllers: [DesignController],
  imports: [UploaderModule],
  providers: [DesignService, DesignRepository, PrismaService],
})
export class DesignModule {}
