import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Query,
  Patch,
  Put,
  Delete,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { SubscriberMessageService } from './subscriber-message.service';
import { CreateSubscriberMessageDto } from '../../validation/dto/subscriber-message/dto/create-subscriber-message.dto';
import { AwsExtractLink } from '@root/interceptors/aws-media.interseptor';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiConsumes,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@modules/auth/jwt-auth.guard';
import { RoutesEntities } from '@root/constants/routes-entities';
import { SubscriberMessage } from '@validation/subscriber-message/entities/subscriber-message.entity';
import { UpdateSubscriberMessageDto } from '@validation/subscriber-message/dto/update-subscriber-message.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploaderService } from '@modules/uploader/uploader.service';

@ApiBearerAuth('jwt')
@UseGuards(JwtAuthGuard)
@AwsExtractLink()
@ApiTags(RoutesEntities.SUBSCRIBERS_MESSAGES)
@Controller(RoutesEntities.SUBSCRIBERS_MESSAGES)
export class SubscriberMessageController {
  constructor(
    private readonly service: SubscriberMessageService,
    private readonly uploaderService: UploaderService,
  ) {}

  @UseInterceptors(FileInterceptor('mediaUrl'))
  @Post()
  @ApiOperation({ summary: 'Create a new subscriber message' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The message has been successfully created.',
    type: SubscriberMessage,
  })
  @ApiConsumes('multipart/form-data')
  async create(
    @Body() createSubscriberMessageDto: CreateSubscriberMessageDto,
    @UploadedFile() mediaUrl?: Express.Multer.File,
  ) {
    const fileUrl: string | null =
      mediaUrl && (await this.uploaderService.uploadFile(mediaUrl));

    return this.service.create({
      ...createSubscriberMessageDto,
      mediaUrl:
        fileUrl ||
        this.uploaderService.getKeyByMediaUrl(
          createSubscriberMessageDto.mediaUrl,
        ),
    });
  }

  @Get()
  @ApiOperation({ summary: 'Get all subscriber messages for a specific shop' })
  @ApiQuery({
    name: 'shopId',
    description: 'Unique identifier of the shop',
    example: 'd1b6c4f1-e034-42f5-bb09-5f84b0f307a3',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of subscriber messages for the shop.',
    type: [SubscriberMessage],
  })
  findAllByShopID(@Query('shopId') shopId: string) {
    return this.service.findAllByShopID(shopId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single subscriber message by ID' })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the message',
    example: 'a2d4f3b1-e034-42f5-bb09-5f84b0f307a3',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The requested subscriber message.',
    type: SubscriberMessage,
  })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @UseInterceptors(FileInterceptor('mediaUrl'))
  @Patch(':id')
  @ApiOperation({ summary: 'Update subscribers message' })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of message',
    example: 'd1b6c4f1-e034-42f5-bb09-5f84b0f307a3',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Updated subscribers message',
    type: SubscriberMessage,
  })
  @ApiConsumes('multipart/form-data')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateSubscriberMessageDto,
    @UploadedFile() mediaUrl?: Express.Multer.File,
  ) {
    const fileUrl: string | null =
      mediaUrl && (await this.uploaderService.uploadFile(mediaUrl));
    return this.service.update(id, {
      ...updateDto,
      mediaUrl:
        fileUrl || this.uploaderService.getKeyByMediaUrl(updateDto.mediaUrl),
    });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Trigger to send message' })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of message',
    example: 'd1b6c4f1-e034-42f5-bb09-5f84b0f307a3',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Updated subscribers message',
    type: SubscriberMessage,
  })
  async sendMessage(@Param('id') id: string) {
    return this.service.sendMessage(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete message' })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of message',
    example: 'd1b6c4f1-e034-42f5-bb09-5f84b0f307a3',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Message was deleted',
  })
  async delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
