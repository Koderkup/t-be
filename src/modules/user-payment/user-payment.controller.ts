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
  ApiBody,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';

import { UserPaymentService } from './user-payment.service';
import {
  UserPaymentCreateDto,
  UserPaymentUpdateDto,
  UserPaymentEntity,
} from '@validation/user-payment';
import { PaginationQueryDto } from '@validation/shared';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RoutesEntities } from '@root/constants/routes-entities';

@ApiTags(RoutesEntities.USERS_PAYMENTS)
@Controller(RoutesEntities.USERS_PAYMENTS)
export class UserPaymentController {
  constructor(private readonly service: UserPaymentService) {}

  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a user payment' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The user payment has been successfully created.',
    type: UserPaymentEntity,
  })
  @ApiBody({ type: UserPaymentCreateDto })
  @HttpCode(201)
  async create(@Body() createDto: UserPaymentCreateDto) {
    return this.service.create(createDto);
  }

  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all user payments' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of user payments',
    type: [UserPaymentEntity],
  })
  async findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.service.findAll(paginationQuery);
  }

  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get a user payment by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Details of the user payment',
    type: UserPaymentEntity,
  })
  async findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiQuery({
    name: 'shopId',
    required: false,
    description: 'It need for redis logging any info about actions with shop',
  })
  @ApiOperation({ summary: 'Update a user payment' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The user payment has been successfully updated.',
    type: UserPaymentEntity,
  })
  @ApiBody({ type: UserPaymentUpdateDto })
  async update(
    @Param('id') id: string,
    @Body() updateDto: UserPaymentUpdateDto,
  ) {
    return this.service.update(id, updateDto);
  }

  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiQuery({
    name: 'shopId',
    required: false,
    description: 'It need for redis logging any info about actions with shop',
  })
  @ApiOperation({ summary: 'Delete a user payment' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The user payment has been successfully deleted.',
    type: UserPaymentEntity,
  })
  async remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
