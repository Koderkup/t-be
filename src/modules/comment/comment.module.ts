import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { CommentRepository } from './comment.repository';
import { PrismaService } from 'src/services/prisma.service';

@Module({
  controllers: [CommentController],
  providers: [CommentService, CommentRepository, PrismaService],
})
export class CommentModule {}
