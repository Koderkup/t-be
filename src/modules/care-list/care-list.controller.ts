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
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { CareListService } from './care-list.service';
import {
  CareListCreateDto,
  CareListUpdateDto,
  CareListEntity,
} from 'src/validation/dto/care-list';
import { PaginationQueryDto } from 'src/validation/dto/shared';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RoutesEntities } from '@root/constants/routes-entities';

@ApiTags(RoutesEntities.CARE_LISTS)
@Controller(RoutesEntities.CARE_LISTS)
@ApiBearerAuth('jwt')
@UseGuards(JwtAuthGuard)
export class CareListController {
  constructor(private readonly service: CareListService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new care list' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The care list has been successfully created.',
    type: CareListEntity,
  })
  @HttpCode(201)
  async create(@Body() createDto: CareListCreateDto) {
    return this.service.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all care lists' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return all care lists.',
    type: [CareListEntity],
  })
  async findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.service.findAll(paginationQuery);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a care list by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The care list details.',
    type: CareListEntity,
  })
  async findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a care list by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The care list has been successfully updated.',
    type: CareListEntity,
  })
  async update(@Param('id') id: string, @Body() updateDto: CareListUpdateDto) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a care list by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The care list has been successfully deleted.',
    type: CareListEntity,
  })
  @ApiQuery({
    name: 'shopId',
    required: false,
    description: 'It need for redis logging any info about actions with shop',
  })
  async remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
