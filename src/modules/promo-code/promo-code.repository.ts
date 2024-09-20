import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/services/prisma.service';
import {
  PromoCodeCreateDto,
  PromoCodeEntity,
  PromoCodeUpdateDto,
} from 'src/validation/dto/promo-code';
import { PaginationQueryDto } from 'src/validation/dto/shared';

@Injectable()
export class PromoCodeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(promoCodeData: PromoCodeCreateDto): Promise<PromoCodeEntity> {
    const promoCode = await this.prisma.promoCode.create({
      data: promoCodeData,
    });
    return promoCode as PromoCodeEntity;
  }

  async findAll(
    paginationQuery: PaginationQueryDto,
  ): Promise<PromoCodeEntity[]> {
    const { limit, offset, sortingColumn, sort, searchString, shopId } =
      paginationQuery;
    const promoCodeModelInstance = Prisma.PromoCodeScalarFieldEnum;
    const validSortingColumns = Object.keys(promoCodeModelInstance) as string[];

    if (sortingColumn && !validSortingColumns.includes(sortingColumn)) {
      throw new BadRequestException(
        `Invalid sorting column '${sortingColumn}'. List of valid columns: ${validSortingColumns}'.`,
      );
    }

    const whereClause: Prisma.PromoCodeWhereInput = searchString
      ? {
          OR: [{ code: { contains: searchString, mode: 'insensitive' } }],
        }
      : {};

    const promoCodes = await this.prisma.promoCode.findMany({
      where: { ...whereClause, shopId },
      take: +limit,
      skip: +offset,
      orderBy: sortingColumn
        ? { [sortingColumn]: sort?.toLowerCase() || 'asc' }
        : undefined,
    });
    return promoCodes;
  }

  async findById(id: string): Promise<PromoCodeEntity | null> {
    const promoCode = await this.prisma.promoCode.findUnique({
      where: { id },
    });
    return promoCode as PromoCodeEntity;
  }

  async update(
    id: string,
    promoCodeData: PromoCodeUpdateDto,
  ): Promise<PromoCodeEntity | null> {
    const promoCode = await this.prisma.promoCode.update({
      where: { id },
      data: promoCodeData,
    });
    return promoCode as PromoCodeEntity;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.promoCode.delete({
      where: { id },
    });
  }
}
