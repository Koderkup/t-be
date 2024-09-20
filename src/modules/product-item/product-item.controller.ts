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
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
  ApiConsumes,
} from '@nestjs/swagger';
import { ProductItemService } from './product-item.service';
import {
  ProductItemCreateDto,
  ProductItemUpdateDto,
  ProductItemEntity,
} from 'src/validation/dto/product-item';
import { PaginationQueryDto } from 'src/validation/dto/shared';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RoutesEntities } from '@root/constants/routes-entities';
import { AwsExtractLink } from '@root/interceptors/aws-media.interseptor';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploaderService } from '@modules/uploader/uploader.service';

@AwsExtractLink()
@ApiTags(RoutesEntities.PRODUCTS_ITEMS)
@Controller(RoutesEntities.PRODUCTS_ITEMS)
export class ProductItemController {
  constructor(
    private readonly service: ProductItemService,
    private readonly uploaderService: UploaderService,
  ) {}

  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('mediasUrl'))
  @Post()
  @ApiOperation({ summary: 'Create a new product item' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The product item has been successfully created.',
    type: ProductItemEntity,
  })
  @ApiConsumes('multipart/form-data')
  @HttpCode(201)
  async create(
    @Body() createDto: ProductItemCreateDto,
    @UploadedFiles() mediasUrl?: Array<Express.Multer.File>,
  ) {
    return this.service.create({
      ...createDto,
      mediasUrl: await this.uploaderService.mediasUrlParse([
        ...(createDto.mediasUrl
          ? JSON.parse(createDto.mediasUrl.toString())
          : []),
        ...mediasUrl,
      ]),
    });
  }

  @Get()
  @ApiOperation({ summary: 'Get all product items' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return all product items.',
    type: [ProductItemEntity],
  })
  async findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.service.findAll(paginationQuery);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product item by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The product item details.',
    type: ProductItemEntity,
  })
  async findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('mediasUrl'))
  @Patch(':id')
  @ApiQuery({
    name: 'shopId',
    required: false,
    description: 'It need for redis logging any info about actions with shop',
  })
  @ApiOperation({ summary: 'Update a product item by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The product item has been successfully updated.',
    type: ProductItemEntity,
  })
  @ApiConsumes('multipart/form-data')
  async update(
    @Param('id') id: string,
    @Body() updateDto: ProductItemUpdateDto,
    @UploadedFiles() mediasUrl?: Array<Express.Multer.File>,
  ) {
    return this.service.update(id, {
      ...updateDto,
      mediasUrl: await this.uploaderService.mediasUrlParse([
        ...(updateDto.mediasUrl
          ? JSON.parse(updateDto.mediasUrl.toString())
          : []),
        ...mediasUrl,
      ]),
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
  @ApiOperation({ summary: 'Delete a product item by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The product item has been successfully deleted.',
    type: ProductItemEntity,
  })
  async remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
