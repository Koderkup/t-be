import { Injectable, NotFoundException } from '@nestjs/common';
import { CareListRepository } from './care-list.repository';
import { CareList } from '@prisma/client';
import {
  CareListCreateDto,
  CareListUpdateDto,
} from 'src/validation/dto/care-list';
import { PaginationQueryDto } from 'src/validation/dto/shared';

@Injectable()
export class CareListService {
  constructor(private readonly repository: CareListRepository) {}

  create(data: CareListCreateDto): Promise<CareList> {
    return this.repository.create(data);
  }

  findAll(paginationQuery: PaginationQueryDto): Promise<CareList[]> {
    return this.repository.findAll(paginationQuery);
  }

  async findOne(id: string) {
    const careList = await this.repository.findOne(id);

    if (!careList) throw new NotFoundException('Care list not found');

    return careList;
  }

  update(id: string, data: CareListUpdateDto) {
    return this.repository.update(id, data);
  }

  remove(id: string): Promise<CareList> {
    return this.repository.remove(id);
  }
}
