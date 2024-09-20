import { Injectable, NotFoundException } from '@nestjs/common';
import { PromoCodeRepository } from './promo-code.repository';
import {
  PromoCodeCreateDto,
  PromoCodeEntity,
  PromoCodeUpdateDto,
} from 'src/validation/dto/promo-code';
import { PaginationQueryDto } from 'src/validation/dto/shared';

@Injectable()
export class PromoCodeService {
  constructor(private readonly repository: PromoCodeRepository) {}

  async create(promoCodeData: PromoCodeCreateDto): Promise<PromoCodeEntity> {
    return this.repository.create(promoCodeData);
  }

  async findAll(
    paginationQuery: PaginationQueryDto,
  ): Promise<PromoCodeEntity[]> {
    return this.repository.findAll(paginationQuery);
  }

  async findById(id: string) {
    const promoCode = await this.repository.findById(id);

    if (!promoCode) throw new NotFoundException('Promo code not found');

    return promoCode;
  }

  async update(id: string, promoCodeData: PromoCodeUpdateDto) {
    await this.findById(id);
    return this.repository.update(id, promoCodeData);
  }

  async delete(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
