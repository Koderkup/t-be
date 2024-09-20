import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { FunctionalityService } from './functionality.service';
import {
  FunctionalityCreateDto,
  FunctionalityEntity,
  FunctionalityUpdateDto,
} from '@validation/functionality';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PaginationQueryDto } from '@validation/shared';
import { RoutesEntities } from '@root/constants/routes-entities';
import { AwsExtractLink } from '@root/interceptors/aws-media.interseptor';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploaderService } from '@modules/uploader/uploader.service';

@ApiTags(RoutesEntities.FUNCTIONALITIES)
@Controller(RoutesEntities.FUNCTIONALITIES)
@ApiBearerAuth('jwt')
@UseGuards(JwtAuthGuard)
export class FunctionalityController {
  constructor(
    private readonly service: FunctionalityService,
    private readonly uploaderService: UploaderService,
  ) {}

  @AwsExtractLink()
  @UseInterceptors(FileInterceptor('mediaUrl'))
  @Post()
  @ApiOperation({ summary: 'Create a new functionality' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The functionality has been successfully created.',
    type: FunctionalityEntity,
  })
  @HttpCode(201)
  @ApiConsumes('multipart/form-data')
  async create(
    @Body() createDto: FunctionalityCreateDto,
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

 // @AwsExtractLink()
  @Post('findAll')
  @ApiOperation({ summary: 'Get all functionalities' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return all functionalities.',
    type: [FunctionalityEntity],
  })
  async findAll(
    @Body()
    paginationQuery: PaginationQueryDto,
  ) {
    return this.service.findAll(paginationQuery);
  }

  @AwsExtractLink()
  @Get(':id')
  @ApiOperation({ summary: 'Get a functionality by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The functionality details.',
    type: FunctionalityEntity,
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @AwsExtractLink()
  @UseInterceptors(FileInterceptor('mediaUrl'))
  @Patch(':id')
  @ApiOperation({ summary: 'Update a functionality by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The functionality has been successfully updated.',
    type: FunctionalityEntity,
  })
  @ApiConsumes('multipart/form-data')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: FunctionalityUpdateDto,
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

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a functionality by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The functionality has been successfully deleted.',
    type: FunctionalityEntity,
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.service.remove(id);
  }
}
