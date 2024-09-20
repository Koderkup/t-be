import { Injectable, NotFoundException } from '@nestjs/common';
import { DesignRepository } from './design.repository';
import { Design } from '@prisma/client';
import { PaginationQueryDto } from '@validation/shared';
import { DesignCreateDto, DesignUpdateDto } from '@validation/design';

@Injectable()
export class DesignService {
  constructor(private readonly repository: DesignRepository) {}

  create(data: DesignCreateDto): Promise<Design> {
    return this.repository.create(data);
  }

  findAll(paginationQuery: PaginationQueryDto): Promise<Design[]> {
    return this.repository.findAll(paginationQuery);
  }

  async findOne(id: number) {
    const design = await this.repository.findOne(id);

    if (!design) throw new NotFoundException('Design not found');

    return design;
  }

  update(id: number, data: DesignUpdateDto): Promise<Design> {
    return this.repository.update(id, data);
  }

  remove(id: number): Promise<Design> {
    return this.repository.remove(id);
  }
}
