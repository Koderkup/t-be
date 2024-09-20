import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiConsumes,
} from '@nestjs/swagger';
import { ShopService } from './shop.service';
import {
  ShopEntity,
  CreateShopDto,
  UpdateShopDto,
} from 'src/validation/dto/shop';
import { RoutesEntities } from '@root/constants/routes-entities';
import { FileInterceptor } from '@nestjs/platform-express';
import { AwsExtractLink } from '@root/interceptors/aws-media.interseptor';
import { UploaderService } from '@modules/uploader/uploader.service';

@AwsExtractLink()
@ApiTags(RoutesEntities.SHOPS)
@Controller(RoutesEntities.SHOPS)
export class ShopController {
  constructor(
    private readonly shopService: ShopService,
    private readonly uploaderService: UploaderService,
  ) {}

  @UseInterceptors(FileInterceptor('mediaUrl'))
  @Post()
  @ApiOperation({ summary: 'Create a new shop' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The shop has been successfully created.',
    type: ShopEntity,
  })
  @HttpCode(201)
  @ApiConsumes('multipart/form-data')
  async create(
    @Body() createShopDto: CreateShopDto,
    @UploadedFile() mediaUrl?: Express.Multer.File,
  ) {
    const fileUrl: string | null =
      mediaUrl && (await this.uploaderService.uploadFile(mediaUrl));

    return this.shopService.create({
      ...createShopDto,
      mediaUrl:
        fileUrl ||
        this.uploaderService.getKeyByMediaUrl(createShopDto.mediaUrl),
    });
  }

  @Get()
  @ApiOperation({ summary: 'Get all shops' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return all shops.',
    type: [ShopEntity],
  })
  @ApiQuery({
    name: 'userId',
    required: false,
    description: 'Filter shops by user',
  })
  async findAll(@Query('userId') userId: string) {
    return this.shopService.findAll(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a shop by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return a shop by ID.',
    type: ShopEntity,
  })
  async findOne(@Param('id') id: string) {
    return this.shopService.findOne(id);
  }

  @UseInterceptors(FileInterceptor('mediaUrl'))
  @Patch(':id')
  @ApiQuery({
    name: 'shopId',
    required: false,
    description: 'It need for redis logging any info about actions with shop',
  })
  @ApiOperation({ summary: 'Update a shop by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The shop has been successfully updated.',
    type: ShopEntity,
  })
  @ApiConsumes('multipart/form-data')
  async update(
    @Param('id') id: string,
    @Body() updateShopDto: UpdateShopDto,
    @UploadedFile() mediaUrl?: Express.Multer.File,
  ) {
    const fileUrl: string | null =
      mediaUrl && (await this.uploaderService.uploadFile(mediaUrl));
    return this.shopService.update(id, {
      ...updateShopDto,
      mediaUrl:
        fileUrl ||
        this.uploaderService.getKeyByMediaUrl(updateShopDto.mediaUrl),
    });
  }

  @Delete(':id')
  @ApiQuery({
    name: 'shopId',
    required: false,
    description: 'It need for redis logging any info about actions with shop',
  })
  @ApiOperation({ summary: 'Delete a shop by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The shop has been successfully deleted.',
    type: ShopEntity,
  })
  async remove(@Param('id') id: string) {
    return this.shopService.remove(id);
  }
}
