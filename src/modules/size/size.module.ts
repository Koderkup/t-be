import { Module } from '@nestjs/common';
import { SizeService } from './size.service';
import { SizeController } from './size.controller';
import { SizeRepository } from './size.repository';
import { PrismaService } from 'src/services/prisma.service';

@Module({
  controllers: [SizeController],
  providers: [SizeService, SizeRepository, PrismaService],
})
export class SizeModule {}
