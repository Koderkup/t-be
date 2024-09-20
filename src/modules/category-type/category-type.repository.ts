import {
  Injectable,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { CategoryType, Prisma } from '@prisma/client';
import { PrismaService } from 'src/services/prisma.service';
import {
  CategoryTypeCreateDto,
  CategoryTypeUpdateDto,
} from 'src/validation/dto/category-type';
import { PaginationQueryDto } from 'src/validation/dto/shared';

@Injectable()
export class CategoryTypeRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CategoryTypeCreateDto): Promise<CategoryType> {
    const { name, description, parentId, shopId } = data;

    return this.prisma.categoryType.create({
      data: {
        name,
        description,
        parent: parentId ? { connect: { id: parentId } } : undefined,
        shop: { connect: { id: shopId } },
      },
      include: {
        products: {
          select: {
            id: true,
            name: true,
            colors: true,
          },
        },
        parent: {
          select: {
            id: true,
            name: true,
          },
        },
        subcategories: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async findAll(paginationQuery: PaginationQueryDto): Promise<CategoryType[]> {
    const { limit, offset, sortingColumn, sort, searchString, shopId } =
      paginationQuery;
    const categoryTypeModelInstance = Prisma.CategoryTypeScalarFieldEnum;
    const validSortingColumns = Object.keys(
      categoryTypeModelInstance,
    ) as string[];

    if (sortingColumn && !validSortingColumns.includes(sortingColumn)) {
      throw new BadRequestException(
        `Invalid sorting column '${sortingColumn}'. List of valid columns: ${validSortingColumns}'.`,
      );
    }

    const whereClause: Prisma.CategoryTypeWhereInput = searchString
      ? {
          OR: [{ name: { contains: searchString, mode: 'insensitive' } }],
        }
      : {};

    return this.prisma.categoryType.findMany({
      where: { ...whereClause, shopId },
      take: +limit,
      skip: +offset,
      orderBy: sortingColumn
        ? { [sortingColumn]: sort?.toLowerCase() || 'asc' }
        : undefined,
      include: {
        products: {
          select: {
            id: true,
            name: true,
            colors: true,
          },
        },
        parent: {
          select: {
            id: true,
            name: true,
          },
        },
        subcategories: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async findOne(id: string): Promise<CategoryType | null> {
    return this.prisma.categoryType.findUnique({
      where: { id },
      include: {
        parent: {
          select: {
            id: true,
            name: true,
          },
        },
        subcategories: {
          select: {
            id: true,
            name: true,
          },
        },
        products: {
          orderBy: { isFeatured: 'desc' },
          where: {
            stock: {
              gt: 0,
            },
          },
        },
      },
    });
  }

  async update(id: string, data: CategoryTypeUpdateDto) {
    return this.prisma.categoryType
      .update({
        where: { id },
        data,
        include: {
          parent: {
            select: {
              id: true,
              name: true,
            },
          },
          subcategories: {
            select: {
              id: true,
              name: true,
            },
          },
          products: {
            select: {
              id: true,
              name: true,
              colors: true,
            },
          },
        },
      })
      .catch((error) => {
        if (error instanceof Prisma.PrismaClientKnownRequestError)
          throw new ForbiddenException(error);
      });
  }

  async remove(id: string): Promise<CategoryType> {
    return this.prisma.categoryType.delete({
      where: { id },
    });
  }

  async addProducts(
    categoryId: string,
    productIds: string[],
  ): Promise<CategoryType> {
    return this.prisma.categoryType.update({
      where: { id: categoryId },
      data: {
        products: {
          connect: productIds.map((id) => ({ id })),
        },
      },
      include: {
        products: {
          select: {
            id: true,
            name: true,
            colors: true,
          },
        },
      },
    });
  }

  async removeProducts(
    categoryId: string,
    productIds: string[],
  ): Promise<CategoryType> {
    return this.prisma.$transaction(async (prisma) => {
      await prisma.productItem.updateMany({
        where: {
          id: {
            in: productIds,
          },
          categoryTypeId: categoryId,
        },
        data: {
          categoryTypeId: null,
        },
      });

      return prisma.categoryType.update({
        where: { id: categoryId },
        data: {
          products: {
            disconnect: productIds.map((id) => ({ id })),
          },
        },
        include: {
          products: {
            select: {
              id: true,
              name: true,
              colors: true,
            },
          },
        },
      });
    });
  }
}
