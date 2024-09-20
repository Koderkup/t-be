import { BadRequestException, Injectable } from '@nestjs/common';
import { Functionality, Prisma } from '@prisma/client';
import { PrismaService } from '@services/prisma.service';
import {
  FunctionalityCreateDto,
  FunctionalityUpdateDto,
} from '@validation/functionality';
import { PaginationQueryDto } from '@validation/shared';
@Injectable()
export class FunctionalityRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: FunctionalityCreateDto): Promise<Functionality> {
    const { ...rest } = data;
    const createDto: Prisma.FunctionalityCreateInput = {
      ...rest,
      //shops: {
      //  connect: null
      //},
    };
    //if (shopsId) {
    //  createDto.shops.connect = {
    //    ...shopsId.map((id) => ({ id })),
    //  };
    //}
    return this.prisma.functionality.create({
      data: {
        ...createDto,
      },
    });
  }

  async findAll(args: PaginationQueryDto): Promise<Functionality[]> {
    const { limit, offset, sortingColumn, sort, searchString } = args;
    const categoryTypeModelInstance = Prisma.FunctionalityScalarFieldEnum;
    const validSortingColumns = Object.keys(
      categoryTypeModelInstance,
    ) as string[];

    if (sortingColumn && !validSortingColumns.includes(sortingColumn)) {
      throw new BadRequestException(
        `Invalid sorting column '${sortingColumn}'. List of valid columns: ${validSortingColumns}'.`,
      );
    }

    const whereClause: Prisma.FunctionalityWhereInput = searchString
      ? {
          OR: [{ name: { contains: searchString, mode: 'insensitive' } }],
        }
      : {};
    return this.prisma.functionality.findMany({
      where: whereClause,
      take: +limit,
      skip: +offset,
      orderBy: sortingColumn
        ? { [sortingColumn]: sort?.toLowerCase() || 'asc' }
        : undefined,
    });
  }

  async findOne(id: number): Promise<Functionality | null> {
    return this.prisma.functionality.findUnique({
      where: { id },
    });
  }

  async update(
    id: number,
    data: FunctionalityUpdateDto,
  ): Promise<Functionality> {
    const updateDto: Prisma.FunctionalityUpdateInput = {
      ...data,
    };
    return this.prisma.functionality.update({
      where: { id },
      data: updateDto,
    });
  }

  async remove(id: number): Promise<Functionality> {
    return this.prisma.functionality.delete({
      where: { id },
    });
  }
}
