import { Module } from '@nestjs/common';
import { ColorService } from './color.service';
import { ColorController } from './color.controller';
import { ColorRepository } from './color.repository';
import { PrismaService } from 'src/services/prisma.service';

@Module({
  controllers: [ColorController],
  providers: [ColorService, ColorRepository, PrismaService],
})
export class ColorModule {}
