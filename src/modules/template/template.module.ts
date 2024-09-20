import { Module } from '@nestjs/common';
import { TemplateService } from './template.service';
import { TemplateController } from './template.controller';
import { TemplateRepository } from './template.repository';
import { PrismaService } from '@services/prisma.service';
import { UploaderModule } from '@modules/uploader/uploader.module';

@Module({
  imports: [UploaderModule],
  controllers: [TemplateController],
  providers: [TemplateService, TemplateRepository, PrismaService],
})
export class TemplatesModule {}
