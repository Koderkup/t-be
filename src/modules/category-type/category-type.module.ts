import { Module } from '@nestjs/common';
import { CategoryTypeService } from './category-type.service';
import { CategoryTypeController } from './category-type.controller';
import { CategoryTypeRepository } from './category-type.repository';
import { PrismaService } from 'src/services/prisma.service';
import { UploaderModule } from '@modules/uploader/uploader.module';

@Module({
  imports: [UploaderModule],
  controllers: [CategoryTypeController],
  providers: [CategoryTypeService, CategoryTypeRepository, PrismaService],
})
export class CategoryTypeModule {}
