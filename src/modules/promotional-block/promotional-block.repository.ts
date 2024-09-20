import { Injectable, BadRequestException } from '@nestjs/common';
import { PromotionalBlock, Prisma } from '@prisma/client';
import { PrismaService } from 'src/services/prisma.service';
import {
  PromotionalBlockCreateDto,
  PromotionalBlockUpdateDto,
} from 'src/validation/dto/promotional-block';
import { PaginationQueryDto } from 'src/validation/dto/shared';

@Injectable()
export class PromotionalBlockRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: PromotionalBlockCreateDto): Promise<PromotionalBlock> {
    const { shopId, ...rest } = data;
    return this.prisma.promotionalBlock.create({
      data: {
        ...rest,
        shop: {
          connect: { id: shopId || undefined },
        },
      },
    });
  }

  async findAll(
    paginationQuery: PaginationQueryDto,
  ): Promise<PromotionalBlock[]> {
    const { limit, offset, sortingColumn, sort, searchString, shopId } =
      paginationQuery;
    const promotionalBlockModelInstance =
      Prisma.PromotionalBlockScalarFieldEnum;
    const validSortingColumns = Object.keys(
      promotionalBlockModelInstance,
    ) as string[];

    if (sortingColumn && !validSortingColumns.includes(sortingColumn)) {
      throw new BadRequestException(
        `Invalid sorting column '${sortingColumn}'. List of valid columns: ${validSortingColumns}'.`,
      );
    }

    const whereClause: Prisma.PromotionalBlockWhereInput = searchString
      ? {
          OR: [{ title: { contains: searchString, mode: 'insensitive' } }],
        }
      : {};

    return this.prisma.promotionalBlock.findMany({
      where: { ...whereClause, shopId },
      take: +limit,
      skip: +offset,
      orderBy: sortingColumn
        ? { [sortingColumn]: sort?.toLowerCase() || 'asc' }
        : undefined,
    });
  }

  async findOne(id: string): Promise<PromotionalBlock | null> {
    return this.prisma.promotionalBlock.findUnique({
      where: { id },
    });
  }

  async update(
    id: string,
    data: PromotionalBlockUpdateDto,
  ): Promise<PromotionalBlock> {
    const { shopId, ...rest } = data;

    const updateDto: Prisma.PromotionalBlockUpdateInput = {
      ...rest,
    };
    if (shopId) {
      updateDto.shop = {
        connect: { id: shopId },
      };
    }

    return this.prisma.promotionalBlock.update({
      where: { id },
      data: updateDto,
    });
  }

  async updateMany(clause: Prisma.PromotionalBlockUpdateManyArgs) {
    return this.prisma.promotionalBlock.updateMany(clause);
  }

  async remove(id: string): Promise<PromotionalBlock> {
    return this.prisma.promotionalBlock.delete({
      where: { id },
    });
  }

  async findActive(shopId?: string): Promise<PromotionalBlock | null> {
    return this.prisma.promotionalBlock.findFirst({
      where: { isActive: true, shopId },
    });
  }
}
