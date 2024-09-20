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
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SegmentService } from './segment.service';
import {
  SegmentCreateDto,
  SegmentEntity,
  SegmentQueryDto,
} from 'src/validation/dto/segment';
import { SegmentUpdateDto } from 'src/validation/dto/segment';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SegmentType } from '@prisma/client';
import { RoutesEntities } from '@root/constants/routes-entities';

@ApiTags(RoutesEntities.SEGMENTS)
@Controller(RoutesEntities.SEGMENTS)
export class SegmentController {
  constructor(private readonly segmentService: SegmentService) {}

  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a segment' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The segment has been successfully created.',
    type: SegmentEntity,
  })
  @ApiBody({ type: SegmentCreateDto })
  async create(@Body() createSegmentDto: SegmentCreateDto) {
    return this.segmentService.create(createSegmentDto);
  }

  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get customers by segment' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get customers telegramId array by segment',
    type: [String],
  })
  @Get(':type')
  async findCustomersBySegments(
    @Param('type') type: SegmentType,
    @Query() segmentQuery: SegmentQueryDto,
  ) {
    return this.segmentService.getCustomersBySegmentType(type, segmentQuery);
  }

  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all segments' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return all segments.',
    type: [SegmentEntity],
  })
  @Get()
  async findAll() {
    return this.segmentService.findAll();
  }

  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update a segment by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The segment has been successfully updated.',
    type: SegmentEntity,
  })
  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateSegmentDto: SegmentUpdateDto,
  ) {
    return this.segmentService.update(id, updateSegmentDto);
  }

  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a segment by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The segment has been successfully deleted.',
    type: SegmentEntity,
  })
  @Delete(':id')
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.segmentService.remove(id);
  }
}
