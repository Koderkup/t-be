import { Injectable, NotFoundException } from '@nestjs/common';
import { SizeRepository } from './size.repository';
import { Size, Prisma } from '@prisma/client';
import { PaginationQueryDto } from 'src/validation/dto/shared';
import { SizeCreateDto } from 'src/validation/dto/size';

@Injectable()
export class SizeService {
  constructor(private readonly repository: SizeRepository) {}

  create(data: SizeCreateDto): Promise<Size> {
    return this.repository.create(data);
  }

  findAll(paginationQuery: PaginationQueryDto): Promise<Size[]> {
    return this.repository.findAll(paginationQuery);
  }

  async findOne(id: string) {
    const size = await this.repository.findOne(id);

    if (!size) throw new NotFoundException('Size not found');

    return size;
  }

  update(id: string, data: Prisma.SizeUpdateInput): Promise<Size> {
    return this.repository.update(id, data);
  }

  remove(id: string): Promise<Size> {
    return this.repository.remove(id);
  }
}
