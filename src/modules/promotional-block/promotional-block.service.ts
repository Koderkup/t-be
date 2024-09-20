import { Injectable, NotFoundException } from '@nestjs/common';
import { PromotionalBlockRepository } from './promotional-block.repository';
import { PromotionalBlock } from '@prisma/client';
import { PaginationQueryDto } from 'src/validation/dto/shared';
import {
  PromotionalBlockCreateDto,
  PromotionalBlockUpdateDto,
} from 'src/validation/dto/promotional-block';

@Injectable()
export class PromotionalBlockService {
  constructor(private readonly repository: PromotionalBlockRepository) {}

  private async _setActive(shopId: string) {
    await this.repository.updateMany({
      where: {
        shopId,
        isActive: true,
      },
      data: {
        isActive: false,
      },
    });
  }

  async create(data: PromotionalBlockCreateDto): Promise<PromotionalBlock> {
    if (data.isActive) {
      await this._setActive(data.shopId);
    }
    return this.repository.create(data);
  }

  findAll(paginationQuery: PaginationQueryDto): Promise<PromotionalBlock[]> {
    return this.repository.findAll(paginationQuery);
  }

  async findOne(id: string) {
    const block = await this.repository.findOne(id);

    if (!block) throw new NotFoundException('Promotional block not found');

    return block;
  }

  async update(
    id: string,
    data: PromotionalBlockUpdateDto,
  ): Promise<PromotionalBlock> {
    const { shopId } = await this.repository.findOne(id);
    if (data.isActive) {
      await this._setActive(shopId);
    }
    return this.repository.update(id, data);
  }

  remove(id: string): Promise<PromotionalBlock> {
    return this.repository.remove(id);
  }

  async findActiveBlock(shopId?: string) {
    const activeBlock = await this.repository.findActive(shopId);

    if (!activeBlock)
      throw new NotFoundException('No active promotional block found');

    return activeBlock;
  }
}
