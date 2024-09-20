import { Injectable, BadRequestException } from '@nestjs/common';
import { Size, Prisma } from '@prisma/client';
import { PrismaService } from 'src/services/prisma.service';
import { PaginationQueryDto } from 'src/validation/dto/shared';
import { SizeCreateDto } from 'src/validation/dto/size';

@Injectable()
export class SizeRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: SizeCreateDto): Promise<Size> {
    return this.prisma.size.create({ data });
  }

  async findAll(paginationQuery: PaginationQueryDto): Promise<Size[]> {
    const { limit, offset, sortingColumn, sort, searchString } =
      paginationQuery;
    const sizeModelInstance = Prisma.SizeScalarFieldEnum;
    const validSortingColumns = Object.keys(sizeModelInstance) as string[];

    if (sortingColumn && !validSortingColumns.includes(sortingColumn)) {
      throw new BadRequestException(
        `Invalid sorting column '${sortingColumn}'. List of valid columns: ${validSortingColumns}'.`,
      );
    }

    const whereClause: Prisma.SizeWhereInput = searchString
      ? {
          OR: [{ name: { contains: searchString, mode: 'insensitive' } }],
        }
      : {};

    return this.prisma.size.findMany({
      where: whereClause,
      take: +limit,
      skip: +offset,
      orderBy: sortingColumn
        ? { [sortingColumn]: sort?.toLowerCase() || 'asc' }
        : undefined,
    });
  }

  async findOne(id: string): Promise<Size | null> {
    return this.prisma.size.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: Prisma.SizeUpdateInput): Promise<Size> {
    return this.prisma.size.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<Size> {
    return this.prisma.size.delete({
      where: { id },
    });
  }
}
