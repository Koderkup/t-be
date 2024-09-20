import { Injectable, NotFoundException } from '@nestjs/common';
import { FunctionalityRepository } from './functionality.repository';
import { Functionality } from '@prisma/client';
import {
  FunctionalityCreateDto,
  FunctionalityUpdateDto,
} from '@validation/functionality';
import { PaginationQueryDto } from '@validation/shared';
@Injectable()
export class FunctionalityService {
  constructor(private readonly repository: FunctionalityRepository) {}

  create(data: FunctionalityCreateDto): Promise<Functionality> {
    return this.repository.create(data);
  }

  findAll(paginationQuery: PaginationQueryDto): Promise<Functionality[]> {
    return this.repository.findAll(paginationQuery);
  }

  async findOne(id: number) {
    const functionality = await this.repository.findOne(id);

    if (!functionality) throw new NotFoundException('Functionality not found');

    return functionality;
  }

  update(id: number, data: FunctionalityUpdateDto): Promise<Functionality> {
    return this.repository.update(id, data);
  }

  remove(id: number): Promise<Functionality> {
    return this.repository.remove(id);
  }
}
