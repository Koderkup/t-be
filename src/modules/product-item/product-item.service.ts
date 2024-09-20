import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductItemRepository } from './product-item.repository';
import { PaginationQueryDto } from 'src/validation/dto/shared';
import {
  ProductItemCreateDto,
  ProductItemEntity,
  ProductItemUpdateDto,
} from 'src/validation/dto/product-item';

@Injectable()
export class ProductItemService {
  constructor(private readonly repository: ProductItemRepository) {}

  parseData(data) {
    let { colors, sizes } = data;

    if (!Array.isArray(colors) && colors) {
      colors = JSON.parse(colors);
    }

    if (!Array.isArray(sizes) && sizes) {
      sizes = JSON.parse(sizes);
    }

    return { ...data, colors, sizes };
  }

  create(data: ProductItemCreateDto): Promise<ProductItemEntity> {
    return this.repository.create(this.parseData(data));
  }

  findAll(paginationQuery: PaginationQueryDto): Promise<ProductItemEntity[]> {
    return this.repository.findAll(paginationQuery);
  }

  async findOne(id: string) {
    const item = await this.repository.findOne(id);

    if (!item) throw new NotFoundException('Product item not found');

    return item;
  }

  update(id: string, data: ProductItemUpdateDto): Promise<ProductItemEntity> {
    return this.repository.update(id, this.parseData(data));
  }

  remove(id: string): Promise<ProductItemEntity> {
    return this.repository.remove(id);
  }
}
