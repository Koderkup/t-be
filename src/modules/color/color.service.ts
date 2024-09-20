import { Injectable, NotFoundException } from '@nestjs/common';
import { ColorRepository } from './color.repository';
import { Color, Prisma } from '@prisma/client';
import { PaginationQueryDto } from 'src/validation/dto/shared';
import { ColorCreateDto } from 'src/validation/dto/color';

@Injectable()
export class ColorService {
  constructor(private readonly repository: ColorRepository) {}

  create(data: ColorCreateDto): Promise<Color> {
    return this.repository.create(data);
  }

  findAll(paginationQuery: PaginationQueryDto): Promise<Color[]> {
    return this.repository.findAll(paginationQuery);
  }

  async findOne(id: string) {
    const color = await this.repository.findOne(id);

    if (!color) throw new NotFoundException('Color not found');

    return color;
  }

  update(id: string, data: Prisma.ColorUpdateInput): Promise<Color> {
    return this.repository.update(id, data);
  }

  remove(id: string): Promise<Color> {
    return this.repository.remove(id);
  }
}
