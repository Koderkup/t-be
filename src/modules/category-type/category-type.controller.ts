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
import { CategoryTypeService } from './category-type.service';
import {
  CategoryTypeCreateDto,
  CategoryTypeUpdateDto,
  CategoryTypeEntityGetAll,
  CategoryTypeProductsDto,
  CategoryTypeEntityGetOne,
} from 'src/validation/dto/category-type';
import { PaginationQueryDto } from 'src/validation/dto/shared';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RoutesEntities } from '@root/constants/routes-entities';
import { AwsExtractLink } from '@root/interceptors/aws-media.interseptor';

@ApiTags(RoutesEntities.CATEGORY_TYPES)
@Controller(RoutesEntities.CATEGORY_TYPES)
export class CategoryTypeController {
  constructor(private readonly service: CategoryTypeService) {}

  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new category type' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The category type has been successfully created.',
    type: CategoryTypeEntityGetAll,
  })
  @HttpCode(201)
  async create(@Body() createDto: CategoryTypeCreateDto) {
    return this.service.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all category types' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return all category types.',
    type: [CategoryTypeEntityGetAll],
  })
  async findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.service.findAll(paginationQuery);
  }

  @AwsExtractLink()
  @Get(':id')
  @ApiOperation({ summary: 'Get a category type by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The category type details.',
    type: CategoryTypeEntityGetOne,
  })
  async findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a category type by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The category type has been successfully updated.',
    type: CategoryTypeEntityGetAll,
  })
  async update(
    @Param('id') id: string,
    @Body() updateDto: CategoryTypeUpdateDto,
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
  @ApiOperation({ summary: 'Delete a category type by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The category type has been successfully deleted.',
    type: CategoryTypeEntityGetAll,
  })
  async remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  @Patch(':id/products')
  @ApiQuery({
    name: 'shopId',
    required: false,
    description: 'It need for redis logging any info about actions with shop',
  })
  @ApiOperation({ summary: 'Add products to a category type' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Products have been successfully added to the category type.',
    type: CategoryTypeEntityGetAll,
  })
  async addProducts(
    @Param('id') categoryId: string,
    @Body() productIds: CategoryTypeProductsDto,
  ) {
    return this.service.addProducts(categoryId, productIds.ids);
  }

  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  @Patch(':id/remove-products')
  @ApiQuery({
    name: 'shopId',
    required: false,
    description: 'It need for redis logging any info about actions with shop',
  })
  @ApiOperation({ summary: 'Remove products from a category type' })
  @ApiResponse({
    status: HttpStatus.OK,
    description:
      'Products have been successfully removed from the category type.',
    type: CategoryTypeEntityGetAll,
  })
  async removeProducts(
    @Param('id') categoryId: string,
    @Body() productIds: CategoryTypeProductsDto,
  ) {
    return this.service.removeProducts(categoryId, productIds.ids);
  }
}
