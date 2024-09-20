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
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { ColorService } from './color.service';
import {
  ColorCreateDto,
  ColorUpdateDto,
  ColorEntity,
} from 'src/validation/dto/color';
import { PaginationQueryDto } from 'src/validation/dto/shared';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RoutesEntities } from '@root/constants/routes-entities';

@ApiTags(RoutesEntities.COLORS)
@Controller(RoutesEntities.COLORS)
@ApiBearerAuth('jwt')
@UseGuards(JwtAuthGuard)
export class ColorController {
  constructor(private readonly service: ColorService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new color' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The color has been successfully created.',
    type: ColorEntity,
  })
  @ApiQuery({
    name: 'shopId',
    required: false,
    description: 'It need for redis logging any info about actions with shop',
  })
  @HttpCode(201)
  async create(@Body() createDto: ColorCreateDto) {
    return this.service.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all colors' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return all colors.',
    type: [ColorEntity],
  })
  async findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.service.findAll(paginationQuery);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a color by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The color details.',
    type: ColorEntity,
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
  @ApiOperation({ summary: 'Update a color by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The color has been successfully updated.',
    type: ColorEntity,
  })
  async update(@Param('id') id: string, @Body() updateDto: ColorUpdateDto) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  @ApiQuery({
    name: 'shopId',
    required: false,
    description: 'It need for redis logging any info about actions with shop',
  })
  @ApiOperation({ summary: 'Delete a color by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The color has been successfully deleted.',
    type: ColorEntity,
  })
  async remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
