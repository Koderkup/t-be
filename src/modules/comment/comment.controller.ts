import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { RoutesEntities } from '@root/constants/routes-entities';
import { Comment } from '@prisma/client';
import CommentUpdateDto from '@validation/comment/comment-update.dto';
import CommentCreateDto from '@validation/comment/comment-create.dto';

@ApiTags(RoutesEntities.COMMENT)
@Controller(RoutesEntities.COMMENT)
export class CommentController {
  constructor(private readonly service: CommentService) {}
  @Get('get-all-comments-by-product-id/:id')
  @ApiOperation({ summary: 'Get all comments by ProductItemId' })
  @ApiResponse({
    status: HttpStatus.FOUND,
    description: 'The comment has been successfully founded',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Id is not correct.',
  })
  @HttpCode(200)
  async getAllCommentsByProductId(
    @Param('id') productItemId: string,
  ): Promise<Comment[]> {
    return await this.service.getAllCommentsByProductItemId(productItemId);
  }

  @Post('create')
  @ApiOperation({ summary: 'Create new comment' })
  @ApiResponse({
    status: HttpStatus.FOUND,
    description: 'The comment has been successfully created',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'CommentCreateDto is not correct.',
  })
  @HttpCode(200)
  async create(@Body() commentCreateDto: CommentCreateDto) {
    return await this.service.create(commentCreateDto);
  }

  @Put('update/:id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Update items in Comment' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'All items in the comment is valid.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Id or CommentUpdateDto are not correct',
  })
  async update(
    @Param('id') id: string,
    @Body() commentUpdateDto: CommentUpdateDto,
  ) {
    return this.service.update(id, commentUpdateDto);
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Delete an comment by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The comment has been successfully deleted.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Id is not correct',
  })
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
