import { BadRequestException, Injectable } from '@nestjs/common';
import { Color, Prisma } from '@prisma/client';
import { PrismaService } from 'src/services/prisma.service';
import { ColorCreateDto } from 'src/validation/dto/color';
import { PaginationQueryDto } from 'src/validation/dto/shared';

@Injectable()
export class ColorRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: ColorCreateDto): Promise<Color> {
    return this.prisma.color.create({ data });
  }

  async findAll(paginationQuery: PaginationQueryDto): Promise<Color[]> {
    const { limit, offset, sortingColumn, sort, searchString } =
      paginationQuery;
    const colorModelInstance = Prisma.ColorScalarFieldEnum;
    const validSortingColumns = Object.keys(colorModelInstance) as string[];

    if (sortingColumn && !validSortingColumns.includes(sortingColumn)) {
      throw new BadRequestException(
        `Invalid sorting column '${sortingColumn}'. List of valid columns: ${validSortingColumns}'.`,
      );
    }

    const whereClause: Prisma.ColorWhereInput = searchString
      ? {
          OR: [{ name: { contains: searchString, mode: 'insensitive' } }],
        }
      : {};

    return this.prisma.color.findMany({
      where: whereClause,
      take: +limit,
      skip: +offset,
      orderBy: sortingColumn
        ? { [sortingColumn]: sort?.toLowerCase() || 'asc' }
        : undefined,
    });
  }

  async findOne(id: string): Promise<Color | null> {
    return this.prisma.color.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: Prisma.ColorUpdateInput): Promise<Color> {
    return this.prisma.color.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<Color> {
    return this.prisma.color.delete({
      where: { id },
    });
  }
}
