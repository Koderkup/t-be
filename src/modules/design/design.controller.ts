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
import { DesignService } from './design.service';
import {
  DesignCreateDto,
  DesignEntity,
  DesignUpdateDto,
} from '@validation/design';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiConsumes,
} from '@nestjs/swagger';
import { PaginationQueryDto } from '@validation/shared';
import { RoutesEntities } from '@root/constants/routes-entities';
import { AwsExtractLink } from '@root/interceptors/aws-media.interseptor';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploaderService } from '@modules/uploader/uploader.service';

@ApiTags(RoutesEntities.DESIGNS)
@Controller(RoutesEntities.DESIGNS)
@ApiBearerAuth('jwt')
@UseGuards(JwtAuthGuard)
export class DesignController {
  constructor(
    private readonly service: DesignService,
    private readonly uploaderService: UploaderService,
  ) {}

  //@AwsExtractLink()
 // @UseInterceptors(FileInterceptor('mediaUrl'))
  @Post()
  @ApiOperation({ summary: 'Create a new design' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The design has been successfully created.',
    type: DesignEntity,
  })
  @HttpCode(201)
  @ApiConsumes('multipart/form-data')
  async create(
    @Body() createDto: DesignCreateDto,
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

  //@AwsExtractLink()
  @Post('findAll')
  @ApiOperation({ summary: 'Get all designs' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return all designs.',
    type: [DesignEntity],
  })
  async findAll(
    @Body()
    paginationQuery: PaginationQueryDto,
  ) {
    return this.service.findAll(paginationQuery);
  }

  @AwsExtractLink()
  @Get(':id')
  @ApiOperation({ summary: 'Get a design by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The design details.',
    type: DesignEntity,
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @AwsExtractLink()
  @UseInterceptors(FileInterceptor('mediaUrl'))
  @Patch(':id')
  @ApiOperation({ summary: 'Update a design by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The design has been successfully updated.',
    type: DesignEntity,
  })
  @ApiConsumes('multipart/form-data')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: DesignUpdateDto,
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
  @ApiOperation({ summary: 'Delete a design by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The design has been successfully deleted.',
    type: DesignEntity,
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
