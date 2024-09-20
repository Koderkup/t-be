import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/services/prisma.service';
import {
  AdBlockCreateDto,
  AdBlockEntity,
  AdBlockUpdateDto,
} from 'src/validation/dto/ad-block';
import { PaginationQueryDto } from 'src/validation/dto/shared';

@Injectable()
export class AdBlockRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: AdBlockCreateDto): Promise<AdBlockEntity> {
    const { shopId, ...rest } = data;
    const createDto: Prisma.AdBlockCreateInput = {
      ...rest,
      shop: {
        connect: null,
      },
    };

    if (shopId) {
      createDto.shop.connect = { id: shopId };
    }
    return this.prisma.adBlock.create({ data });
  }

  async findAll(paginationQuery: PaginationQueryDto): Promise<AdBlockEntity[]> {
    const { limit, offset, sortingColumn, sort, searchString, shopId } =
      paginationQuery;
    const AdBlockModelInstance = Prisma.AdBlockScalarFieldEnum;
    const validSortingColumns = Object.keys(AdBlockModelInstance) as string[];

    if (sortingColumn && !validSortingColumns.includes(sortingColumn)) {
      throw new BadRequestException(
        `Invalid sorting column '${sortingColumn}'. List of valid columns: ${validSortingColumns}'.`,
      );
    }

    const whereClause: Prisma.AdBlockWhereInput = searchString
      ? {
          OR: [{ title: { contains: searchString, mode: 'insensitive' } }],
        }
      : {};

    return this.prisma.adBlock.findMany({
      where: { ...whereClause, shopId },
      take: +limit,
      skip: +offset,
      orderBy: sortingColumn
        ? { [sortingColumn]: sort?.toLowerCase() || 'asc' }
        : {},
    });
  }

  async findOne(id: string): Promise<AdBlockEntity | null> {
    return this.prisma.adBlock.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: AdBlockUpdateDto): Promise<AdBlockEntity> {
    const { shopId, ...rest } = data;
    const updateDto: Prisma.AdBlockUpdateInput = {
      ...rest,
      shop: null,
    };
    if (shopId) {
      updateDto.shop = {
        connect: { id: shopId },
      };
    }
    return this.prisma.adBlock.update({ where: { id }, data });
  }

  async remove(id: string): Promise<void> {
    await this.prisma.adBlock.delete({ where: { id } });
  }

  async findActive(shopId?: string): Promise<AdBlockEntity | null> {
    return this.prisma.adBlock.findFirst({
      where: { isActive: true, shopId },
    });
  }

  async updateMany(clause: Prisma.AdBlockUpdateManyArgs) {
    return this.prisma.adBlock.updateMany(clause);
  }

  async isShopExist(shopId: string): Promise<boolean> {
    const count = await this.prisma.adBlock.count({ where: { shopId } });
    return count == 0 ? false : true;
  }
}
