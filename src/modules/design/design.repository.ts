import { BadRequestException, Injectable } from '@nestjs/common';
import { Design, Prisma } from '@prisma/client';
import { PrismaService } from '@services/prisma.service';
import { DesignCreateDto, DesignUpdateDto } from '@validation/design';
import { PaginationQueryDto } from '@validation/shared';

@Injectable()
export class DesignRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: DesignCreateDto): Promise<Design> {
    const createData: Prisma.DesignCreateInput = {
      ...data,
    };
    return this.prisma.design.create({
      data: createData,
    });
  }

  async findAll(args: PaginationQueryDto): Promise<Design[]> {
    const { limit, offset, sortingColumn, sort, searchString, tags } = args;
    const categoryTypeModelInstance = Prisma.DesignScalarFieldEnum;
    const validSortingColumns = Object.keys(
      categoryTypeModelInstance,
    ) as string[];

    if (sortingColumn && !validSortingColumns.includes(sortingColumn)) {
      throw new BadRequestException(
        `Invalid sorting column '${sortingColumn}'. List of valid columns: ${validSortingColumns}'.`,
      );
    }

    const whereClause: Prisma.DesignWhereInput = {
      ...(searchString && {
        OR: [{ name: { contains: searchString, mode: 'insensitive' } }],
      }),
      ...(tags && tags.length > 0 && { tags: { hasSome: tags } }),
    };

    return this.prisma.design.findMany({
      where: whereClause,
      take: +limit,
      skip: +offset,
      orderBy: sortingColumn
        ? { [sortingColumn]: sort?.toLowerCase() || 'asc' }
        : undefined,
    });
  }

  async findOne(id: number): Promise<Design | null> {
    return this.prisma.design.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: DesignUpdateDto): Promise<Design> {
    const updateDto: Prisma.DesignUpdateInput = {
      ...data,
    };
    return this.prisma.design.update({
      where: { id },
      data: updateDto,
    });
  }

  async remove(id: number): Promise<Design> {
    return this.prisma.design.delete({
      where: { id },
    });
  }
}
