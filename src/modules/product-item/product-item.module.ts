import { Module } from '@nestjs/common';

import { PrismaService } from 'src/services/prisma.service';
import { ProductItemController } from './product-item.controller';
import { ProductItemService } from './product-item.service';
import { ProductItemRepository } from './product-item.repository';
import { UploaderModule } from '@modules/uploader/uploader.module';

@Module({
  controllers: [ProductItemController],
  imports: [UploaderModule],
  providers: [ProductItemService, ProductItemRepository, PrismaService],
  exports: [ProductItemRepository],
})
export class ProductItemModule {}
