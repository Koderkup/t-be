import { ForbiddenException, Injectable } from '@nestjs/common';
import { Prisma, Comment } from '@prisma/client';
import { CommentOrNull } from '@local-types/comment/type-comment-or-null';
import CommentCreateDto from '@validation/comment/comment-create.dto';
import { PrismaService } from 'src/services/prisma.service';
import { CommentOrVoid } from '@local-types/comment/type-comment-or-void';
import { LogicExceptionList } from '@root/exceptions/types/logic-exceptions.enum';
import { Exceptions } from '@root/exceptions/expection';

@Injectable()
export class CommentRepository {
  constructor(private prisma: PrismaService) {}
  async create(data: CommentCreateDto): Promise<Comment> {
    const { content, productItemId } = data;
    const existComment = await this.prisma.comment.findFirst({
      where: { content, productItemId },
    });
    if (existComment)
      throw new Error(
        Exceptions[LogicExceptionList.COMMENT_ALREADY_EXISTS].message,
      );
    return this.prisma.comment.create({ data });
  }

  async findAllCommentsByProductItemId(
    productItemId: string,
  ): Promise<Comment[]> {
    return this.prisma.comment.findMany({
      where: { productItemId },
      orderBy: { rating: 'desc' },
    });
  }

  async isExistsComment(
    customerId: string,
    productItemId: string,
  ): Promise<boolean> {
    const comment: number = await this.prisma.comment.count({
      where: { customerId, productItemId },
    });
    return comment !== 0;
  }

  async findById(id: string): Promise<CommentOrNull> {
    return this.prisma.comment.findUnique({
      where: {
        id,
      },
    });
  }

  async update(
    id: string,
    data: Prisma.CommentUpdateInput,
  ): Promise<CommentOrVoid> {
    return this.prisma.comment
      .update({
        where: { id },
        data,
      })
      .catch((error) => {
        if (error instanceof Prisma.PrismaClientKnownRequestError)
          throw new ForbiddenException(error);
      });
  }
  async delete(id: string): Promise<Comment> {
    return this.prisma.comment.delete({
      where: { id },
    });
  }
}
