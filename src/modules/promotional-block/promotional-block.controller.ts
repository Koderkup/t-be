import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
  UseGuards,
  HttpCode,
  ParseUUIDPipe,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
  ApiQuery,
  ApiConsumes,
} from '@nestjs/swagger';

import { PromotionalBlockService } from './promotional-block.service';
import {
  PromotionalBlockCreateDto,
  PromotionalBlockUpdateDto,
  PromotionalBlockEntity,
} from 'src/validation/dto/promotional-block';
import { PaginationQueryDto } from 'src/validation/dto/shared';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RoutesEntities } from '@root/constants/routes-entities';
import { AwsExtractLink } from '@root/interceptors/aws-media.interseptor';
import { UploaderService } from '@modules/uploader/uploader.service';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags(RoutesEntities.PROMOTIONAL_BLOCKS)
@Controller(RoutesEntities.PROMOTIONAL_BLOCKS)
export class PromotionalBlockController {
  constructor(
    private readonly service: PromotionalBlockService,
    private readonly uploaderService: UploaderService,
  ) {}

  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  @AwsExtractLink()
  @UseInterceptors(FileInterceptor('mediaUrl'))
  @Post()
  @ApiOperation({ summary: 'Create a promotional block' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The promotional block has been successfully created.',
    type: PromotionalBlockEntity,
  })
  @ApiBody({ type: PromotionalBlockCreateDto })
  @HttpCode(201)
  @ApiConsumes('multipart/form-data')
  async create(
    @Body() createDto: PromotionalBlockCreateDto,
    @UploadedFile() mediaUrl?: Express.Multer.File,
  ) {
    const fileUrl: string | null =
      mediaUrl && (await this.uploaderService.uploadFile(mediaUrl));
    return this.service.create({
      ...createDto,
      mediaUrl:
        fileUrl || this.uploaderService.getKeyByMediaUrl(createDto.mediaUrl),
    });
  }

  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  @AwsExtractLink()
  @Get()
  @ApiOperation({ summary: 'Get all promotional blocks' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of promotional blocks',
    type: [PromotionalBlockEntity],
  })
  async findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.service.findAll(paginationQuery);
  }

  @AwsExtractLink()
  @Get('/active')
  @ApiOperation({ summary: 'Get the active promotional block' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The active promotional block',
    type: PromotionalBlockEntity,
  })
  @ApiQuery({
    name: 'shopId',
    required: false,
    description: 'Unique shop identifier for filter',
    example: 'a2d4f3b1-e034-42f5-bb09-5f84b0f307a3',
  })
  async findActive(
    @Query('shopId', new ParseUUIDPipe({ optional: true })) shopId?: string,
  ) {
    return this.service.findActiveBlock(shopId);
  }

  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  @AwsExtractLink()
  @Get(':id')
  @ApiOperation({ summary: 'Get a promotional block by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Details of the promotional block',
    type: PromotionalBlockEntity,
  })
  async findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  @AwsExtractLink()
  @UseInterceptors(FileInterceptor('mediaUrl'))
  @Patch(':id')
  @ApiQuery({
    name: 'shopId',
    required: false,
    description: 'It need for redis logging any info about actions with shop',
  })
  @ApiOperation({ summary: 'Update a promotional block' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The promotional block has been successfully updated.',
    type: PromotionalBlockEntity,
  })
  @ApiBody({ type: PromotionalBlockUpdateDto })
  @ApiConsumes('multipart/form-data')
  async update(
    @Param('id') id: string,
    @Body() updateDto: PromotionalBlockUpdateDto,
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

  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiQuery({
    name: 'shopId',
    required: false,
    description: 'It need for redis logging any info about actions with shop',
  })
  @ApiOperation({ summary: 'Delete a promotional block' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The promotional block has been successfully deleted.',
    type: PromotionalBlockEntity,
  })
  async remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
