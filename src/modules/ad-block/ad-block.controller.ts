import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UseGuards,
  Query,
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

import { AdBlockService } from './ad-block.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  AdBlockCreateDto,
  AdBlockUpdateDto,
  AdBlockEntity,
} from 'src/validation/dto/ad-block';
import { PaginationQueryDto } from 'src/validation/dto/shared';
import { RoutesEntities } from '@root/constants/routes-entities';
import { AwsExtractLink } from '@root/interceptors/aws-media.interseptor';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploaderService } from '@modules/uploader/uploader.service';

@ApiTags(RoutesEntities.AD_BLOCKS)
@Controller(RoutesEntities.AD_BLOCKS)
export class AdBlockController {
  constructor(
    private readonly service: AdBlockService,
    private readonly uploaderService: UploaderService,
  ) {}

  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  @AwsExtractLink()
  @UseInterceptors(FileInterceptor('mediaUrl'))
  @Post()
  @ApiOperation({ summary: 'Create an ad block' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The ad block has been successfully created.',
    type: AdBlockEntity,
  })
  @ApiBody({ type: AdBlockCreateDto })
  @ApiQuery({
    name: 'shopId',
    required: false,
    description: 'It need for redis logging any info about actions with shop',
  })
  @HttpCode(201)
  @ApiConsumes('multipart/form-data')
  async create(
    @Body() createDto: AdBlockCreateDto,
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

  @AwsExtractLink()
  @Get('/active')
  @ApiOperation({ summary: 'Get the active ad block' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The active ad block',
    type: AdBlockEntity,
  })
  @ApiQuery({
    name: 'shopId',
    description: 'Unique shop identifier',
    example: 'a2d4f3b1-e034-42f5-bb09-5f84b0f307a3',
    required: false,
  })
  async findActive(
    @Query('shopId', new ParseUUIDPipe({ optional: true })) shopId?: string,
  ) {
    return this.service.findActive(shopId);
  }

  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  @AwsExtractLink()
  @Get()
  @ApiQuery({
    name: 'shopId',
    required: false,
    description: 'It need for redis logging any info about actions with shop',
  })
  @ApiOperation({ summary: 'Get all ad blocks' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of ad blocks',
    type: [AdBlockEntity],
  })
  async findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.service.findAll(paginationQuery);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('jwt')
  @AwsExtractLink()
  @Get(':id')
  @ApiOperation({ summary: 'Get an ad block by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Details of an ad block',
    type: AdBlockEntity,
  })
  @ApiQuery({
    name: 'shopId',
    required: false,
    description: 'It need for redis logging any info about actions with shop',
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
  @ApiOperation({ summary: 'Update an ad block' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The ad block has been successfully updated.',
    type: AdBlockEntity,
  })
  @ApiBody({ type: AdBlockUpdateDto })
  @ApiConsumes('multipart/form-data')
  async update(
    @Param('id') id: string,
    @Body() updateDto: AdBlockUpdateDto,
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
  @ApiOperation({ summary: 'Delete an ad block' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The ad block has been successfully deleted.',
    type: AdBlockEntity,
  })
  async remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
