import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Query,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiOperation, ApiTags, ApiQuery } from '@nestjs/swagger';
import { PromoCodeService } from './promo-code.service';
import {
  PromoCodeEntity,
  PromoCodeCreateDto,
  PromoCodeUpdateDto,
} from 'src/validation/dto/promo-code';
import { PaginationQueryDto } from 'src/validation/dto/shared';
import { RoutesEntities } from '@root/constants/routes-entities';
import { PromoCodeGuard } from './promo-code.guard';

@UseGuards(PromoCodeGuard)
@ApiTags(RoutesEntities.PROMO_CODES)
@Controller(RoutesEntities.PROMO_CODES)
export class PromoCodeController {
  constructor(private readonly promoCodeService: PromoCodeService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new promo code' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The promo code has been successfully created.',
    type: PromoCodeEntity,
  })
  @HttpCode(201)
  async create(@Body() promoCodeData: PromoCodeCreateDto) {
    return this.promoCodeService.create(promoCodeData);
  }

  @Get()
  @ApiOperation({ summary: 'Get all promo codes' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns all promo codes.',
    type: [PromoCodeEntity],
  })
  @ApiQuery({
    name: 'shopId',
    required: true,
    description:
      'It need for access to promocodes and filter promocodes by shopId',
  })
  async findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.promoCodeService.findAll(paginationQuery);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a promo code by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns a single promo code.',
    type: PromoCodeEntity,
  })
  @ApiQuery({
    name: 'shopId',
    required: true,
    description: 'It need for access to promocodes',
  })
  async findById(@Param('id') id: string) {
    return this.promoCodeService.findById(id);
  }

  @Patch(':id')
  @ApiQuery({
    name: 'shopId',
    required: true,
    description: 'It need for access to promocodes',
  })
  @ApiOperation({ summary: 'Update a promo code' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The promo code has been successfully updated.',
    type: PromoCodeEntity,
  })
  async update(
    @Param('id') id: string,
    @Body() promoCodeData: PromoCodeUpdateDto,
  ) {
    return this.promoCodeService.update(id, promoCodeData);
  }

  @Delete(':id')
  @ApiQuery({
    name: 'shopId',
    required: true,
    description: 'It need for access to promocodes',
  })
  @ApiOperation({ summary: 'Delete a promo code' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The promo code has been successfully deleted.',
  })
  async delete(@Param('id') id: string) {
    return this.promoCodeService.delete(id);
  }
}
