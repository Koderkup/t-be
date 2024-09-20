import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryTypeRepository } from './category-type.repository';
import { CategoryType } from '@prisma/client';
import { PaginationQueryDto } from 'src/validation/dto/shared';
import {
  CategoryTypeCreateDto,
  CategoryTypeUpdateDto,
} from 'src/validation/dto/category-type';

@Injectable()
export class CategoryTypeService {
  constructor(private readonly repository: CategoryTypeRepository) {}

  create(data: CategoryTypeCreateDto): Promise<CategoryType> {
    return this.repository.create(data);
  }

  findAll(paginationQuery: PaginationQueryDto): Promise<CategoryType[]> {
    return this.repository.findAll(paginationQuery);
  }

  async findOne(id: string) {
    const categoryType = this.repository.findOne(id);

    if (!categoryType) throw new NotFoundException('Category type not found');

    return categoryType;
  }

  update(id: string, data: CategoryTypeUpdateDto) {
    return this.repository.update(id, data);
  }

  remove(id: string): Promise<CategoryType> {
    return this.repository.remove(id);
  }

  addProducts(categoryId: string, productIds: string[]): Promise<CategoryType> {
    return this.repository.addProducts(categoryId, productIds);
  }

  removeProducts(
    categoryId: string,
    productIds: string[],
  ): Promise<CategoryType> {
    return this.repository.removeProducts(categoryId, productIds);
  }
}
