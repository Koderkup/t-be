import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { SizeService } from './size.service';
import {
  SizeCreateDto,
  SizeUpdateDto,
  SizeEntity,
} from 'src/validation/dto/size';
import { PaginationQueryDto } from 'src/validation/dto/shared';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RoutesEntities } from '@root/constants/routes-entities';

@ApiTags(RoutesEntities.SIZES)
@Controller(RoutesEntities.SIZES)
@ApiBearerAuth('jwt')
@UseGuards(JwtAuthGuard)
export class SizeController {
  constructor(private readonly service: SizeService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new size' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The size has been successfully created.',
    type: SizeEntity,
  })
  @HttpCode(201)
  async create(@Body() createDto: SizeCreateDto) {
    return this.service.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all sizes' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return all sizes.',
    type: [SizeEntity],
  })
  async findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.service.findAll(paginationQuery);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a size by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The size details.',
    type: SizeEntity,
  })
  async findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiQuery({
    name: 'shopId',
    required: false,
    description: 'It need for redis logging any info about actions with shop',
  })
  @ApiOperation({ summary: 'Update a size by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The size has been successfully updated.',
    type: SizeEntity,
  })
  async update(@Param('id') id: string, @Body() updateDto: SizeUpdateDto) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  @ApiQuery({
    name: 'shopId',
    required: false,
    description: 'It need for redis logging any info about actions with shop',
  })
  @ApiOperation({ summary: 'Delete a size by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The size has been successfully deleted.',
    type: SizeEntity,
  })
  async remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
