import { Comment } from '@prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import CommentCreateDto from '@validation/comment/comment-create.dto';
import CommentUpdateDto from '@validation/comment/comment-update.dto';
import { CommentOrVoid } from '@local-types/comment/type-comment-or-void';
import { Exceptions } from '@root/exceptions/expection';
import { LogicExceptionList } from '@root/exceptions/types/logic-exceptions.enum';

@Injectable()
export class CommentService {
  constructor(private readonly repository: CommentRepository) {}

  async create(commentCreateDto: CommentCreateDto): Promise<Comment> {
    const existComment = await this.repository.isExistsComment(
      commentCreateDto.customerId,
      commentCreateDto.productItemId,
    );
    if (!existComment) {
      return this.repository.create(commentCreateDto);
    }
    throw new Error(
      Exceptions[LogicExceptionList.COMMENT_ALREADY_EXISTS].message,
    );
  }

  async getAllCommentsByProductItemId(
    productItemId: string,
  ): Promise<Comment[]> {
    return this.repository.findAllCommentsByProductItemId(productItemId);
  }

  async update(id: string, data: CommentUpdateDto): Promise<CommentOrVoid> {
    const existingComment = await this.repository.findById(id);
    if (!existingComment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    return this.repository.update(id, data);
  }

  async delete(id: string) {
    return this.repository.delete(id);
  }
}
