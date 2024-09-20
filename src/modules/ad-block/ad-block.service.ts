import { Injectable, NotFoundException } from '@nestjs/common';
import { AdBlockRepository } from './ad-block.repository';
import {
  AdBlockCreateDto,
  AdBlockEntity,
  AdBlockUpdateDto,
} from 'src/validation/dto/ad-block';
import { PaginationQueryDto } from 'src/validation/dto/shared';

@Injectable()
export class AdBlockService {
  constructor(private readonly repository: AdBlockRepository) {}

  private async _setActive(shopId: string) {
    await this.repository.updateMany({
      where: {
        isActive: true,
        shopId,
      },
      data: {
        isActive: false,
      },
    });
  }

  async create(data: AdBlockCreateDto): Promise<AdBlockEntity> {
    const isShopExist = this.repository.isShopExist(data.shopId);
    if (!isShopExist) {
      throw new Error(`Shop with id ${data.shopId} doesn't exist`);
    }
    if (data.isActive) {
      await this._setActive(data.shopId);
    }
    return this.repository.create(data);
  }

  async findAll(paginationQuery: PaginationQueryDto): Promise<AdBlockEntity[]> {
    return this.repository.findAll(paginationQuery);
  }

  async findOne(id: string) {
    const adBlock = await this.repository.findOne(id);

    if (!adBlock) throw new NotFoundException('Ad Block not found');

    return adBlock;
  }

  async update(id: string, data: AdBlockUpdateDto): Promise<AdBlockEntity> {
    const adBlock = await this.repository.findOne(id);
    if (!adBlock) {
      throw new Error('Ad Block is not found');
    }
    const shopId = adBlock.shopId;
    if (data.isActive) {
      await this._setActive(shopId);
    }

    const updatedAdBlock = await this.repository.update(adBlock.id, data);

    return updatedAdBlock;
  }

  async remove(id: string): Promise<void> {
    await this.repository.remove(id);
  }

  async findActive(shopId?: string): Promise<AdBlockEntity | null> {
    const active = await this.repository.findActive(shopId);

    if (!active) throw new NotFoundException('No active ad block found');

    return active;
  }
}
