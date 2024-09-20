import { Module } from '@nestjs/common';
import { AdBlockService } from './ad-block.service';
import { AdBlockController } from './ad-block.controller';
import { AdBlockRepository } from './ad-block.repository';
import { PrismaService } from 'src/services/prisma.service';
import { UploaderModule } from '@modules/uploader/uploader.module';

@Module({
  controllers: [AdBlockController],
  imports: [UploaderModule],
  providers: [AdBlockService, AdBlockRepository, PrismaService],
})
export class AdBlockModule {}
