import {
  Injectable,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { CareList, Prisma } from '@prisma/client';
import { PrismaService } from 'src/services/prisma.service';
import {
  CareListCreateDto,
  CareListUpdateDto,
} from 'src/validation/dto/care-list';
import { PaginationQueryDto } from 'src/validation/dto/shared';

const INCLUDE_BODY = {
  products: {
    select: {
      id: true,
      name: true,
      descriptionShort: true,
    },
  },
};

@Injectable()
export class CareListRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CareListCreateDto): Promise<CareList> {
    return this.prisma.careList.create({ data });
  }

  async findAll(paginationQuery: PaginationQueryDto): Promise<CareList[]> {
    const { limit, offset, sortingColumn, sort, searchString } =
      paginationQuery;

    const careListModelInstance = Prisma.CareListScalarFieldEnum;
    const validSortingColumns = Object.keys(careListModelInstance) as string[];

    if (sortingColumn && !validSortingColumns.includes(sortingColumn)) {
      throw new BadRequestException(
        `Invalid sorting column '${sortingColumn}'. List of valid columns: ${validSortingColumns}'.`,
      );
    }

    const whereClause: Prisma.CareListWhereInput = searchString
      ? {
          OR: [{ name: { contains: searchString, mode: 'insensitive' } }],
        }
      : {};

    return this.prisma.careList.findMany({
      where: whereClause,
      take: +limit,
      skip: +offset,
      orderBy: sortingColumn
        ? { [sortingColumn]: sort?.toLowerCase() || 'asc' }
        : undefined,
      include: INCLUDE_BODY,
    });
  }

  async findOne(id: string): Promise<CareList | null> {
    return this.prisma.careList.findUnique({
      where: { id },
      include: INCLUDE_BODY,
    });
  }

  async update(id: string, data: CareListUpdateDto) {
    return this.prisma.careList
      .update({
        where: { id },
        data,
      })
      .catch((err) => {
        if (err instanceof Prisma.PrismaClientValidationError) {
          throw new ForbiddenException(err);
        }
      });
  }

  async remove(id: string): Promise<CareList> {
    return this.prisma.careList.delete({
      where: { id },
    });
  }
}
