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
  HttpCode,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import {
  DashboardEntity,
  DashboardUpdateDto,
  DashboardCreateDto,
} from 'src/validation/dto/dashboard';
import { PaginationQueryDto } from 'src/validation/dto/shared';
import { RoutesEntities } from '@root/constants/routes-entities';

@ApiTags(RoutesEntities.DASHBOARDS)
@Controller(RoutesEntities.DASHBOARDS)
export class DashboardController {
  constructor(private readonly service: DashboardService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new dashboard' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The dashboard has been successfully created.',
    type: DashboardEntity,
  })
  @HttpCode(201)
  async create(@Body() dashboardData: DashboardCreateDto) {
    return this.service.create(dashboardData);
  }

  @Get()
  @ApiOperation({ summary: 'Get all dashboards' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return all dashboards.',
    type: [DashboardEntity],
  })
  async findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.service.findAll(paginationQuery);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an dashboard by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return an dashboard by id.',
    type: DashboardEntity,
  })
  async findById(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an dashboard by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The dashboard has been successfully updated.',
    type: DashboardEntity,
  })
  async update(
    @Param('id') id: string,
    @Body() dashboardData: DashboardUpdateDto,
  ) {
    return this.service.update(id, dashboardData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an dashboard by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The dashboard has been successfully deleted.',
  })
  async delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
