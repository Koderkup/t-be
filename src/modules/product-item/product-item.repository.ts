import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Currency, Prisma } from '@prisma/client';
import { isAllOfType } from 'src/helpers/isAllOfType';
import { PrismaService } from 'src/services/prisma.service';
import {
  ProductItemCreateDto,
  ProductItemEntity,
  ProductItemUpdateDto,
} from 'src/validation/dto/product-item';
import { PaginationQueryDto } from 'src/validation/dto/shared';

const INCLUDE_BODY = {
  colors: true,
  sizes: true,
  recommendations: {
    select: {
      productItem: {
        select: {
          id: true,
          name: true,
          descriptionShort: true,
          prices: true,
          mediasUrl: true,
        },
      },
    },
  },
  recommendedBy: {
    select: {
      productItem: {
        select: {
          id: true,
          name: true,
          descriptionShort: true,
          prices: true,
          mediasUrl: true,
        },
      },
    },
  },
  categoryType: {
    select: {
      id: true,
      name: true,
      description: true,
    },
  },
  careList: {
    select: {
      id: true,
      name: true,
      text: true,
    },
  },
};

@Injectable()
export class ProductItemRepository {
  constructor(private prisma: PrismaService) {}

  private async _updateRecommendations(
    productId: string,
    newRecommendationIds: string[],
  ): Promise<void> {
    const currentRecommendations = await this.prisma.recommendation.findMany({
      where: { productItemId: productId },
    });

    const shopId = currentRecommendations[0]?.shopId;

    const currentRecommendationIds = currentRecommendations.map(
      (rec) => rec.recommendedItemId,
    );

    const toDisconnect = currentRecommendations
      .filter((rec) => !newRecommendationIds.includes(rec.recommendedItemId))
      .map((rec) => ({ id: rec.id }));

    const toConnect = newRecommendationIds
      .filter((id) => !currentRecommendationIds.includes(id))
      .map((recommendedItemId) => ({
        recommendedItemId,
        productItemId: productId,
      }));

    for (const disconnect of toDisconnect) {
      await this.prisma.recommendation.delete({
        where: { id: disconnect.id },
      });
    }

    for (const connect of toConnect) {
      await this.prisma.recommendation.create({
        data: {
          ...connect,
          shopId: shopId,
        },
      });
    }
  }

  private async _updateRecommendedBy(
    productId: string,
    newRecommendedByIds: string[],
  ): Promise<void> {
    const currentRecommendedBy = await this.prisma.recommendation.findMany({
      where: { recommendedItemId: productId },
    });

    const shopId = currentRecommendedBy[0]?.shopId;

    const currentRecommendedByIds = currentRecommendedBy.map(
      (rec) => rec.productItemId,
    );

    const toDisconnect = currentRecommendedBy
      .filter((rec) => !newRecommendedByIds.includes(rec.productItemId))
      .map((rec) => ({ id: rec.id }));

    const toConnect = newRecommendedByIds
      .filter((id) => !currentRecommendedByIds.includes(id))
      .map((productItemId) => ({
        recommendedItemId: productId,
        productItemId,
      }));

    for (const disconnect of toDisconnect) {
      await this.prisma.recommendation.delete({
        where: { id: disconnect.id },
      });
    }

    for (const connect of toConnect) {
      await this.prisma.recommendation.create({
        data: {
          ...connect,
          shopId: shopId,
        },
      });
    }
  }

  async create(data: ProductItemCreateDto): Promise<ProductItemEntity> {
    const {
      colors,
      sizes,
      recommendations,
      recommendedBy,
      shopId,
      careListId,
      categoryTypeId,
      currency,
      ...rest
    } = data;
    const createArgs: Prisma.ProductItemCreateArgs = {
      data: {
        ...rest,
        currency: currency as Currency,
        colors: colors &&
          colors.length && {
            connect: colors?.map((color) => ({ id: color })),
          },
        sizes: sizes &&
          sizes.length && { connect: sizes?.map((size) => ({ id: size })) },
        recommendations: recommendations &&
          recommendations.length && {
            connect: recommendations?.map((recommendation) => ({
              id: recommendation,
            })),
          },
        recommendedBy: recommendedBy &&
          recommendedBy.length && {
            connect: recommendedBy?.map((recommendedByEntity) => ({
              id: recommendedByEntity,
            })),
          },
        shop: {
          connect: {
            id: shopId,
          },
        },
        careList: careListId && {
          connect: {
            id: careListId,
          },
        },
        categoryType: categoryTypeId && {
          connect: {
            id: categoryTypeId,
          },
        },
      },
      include: INCLUDE_BODY,
    };
    const productItem = await this.prisma.productItem.create(createArgs);

    return {
      ...productItem,
    } as unknown as ProductItemEntity;
  }

  async findAll(
    paginationQuery: PaginationQueryDto,
  ): Promise<ProductItemEntity[]> {
    const { limit, offset, sortingColumn, sort, searchString, shopId } =
      paginationQuery;
    const productItemModelInstance = Prisma.ProductItemScalarFieldEnum;
    const validSortingColumns = Object.keys(
      productItemModelInstance,
    ) as string[];

    if (sortingColumn && !validSortingColumns.includes(sortingColumn)) {
      throw new BadRequestException(
        `Invalid sorting column '${sortingColumn}'. List of valid columns: ${validSortingColumns}'.`,
      );
    }

    const whereClause: Prisma.ProductItemWhereInput = searchString
      ? {
          OR: [{ name: { contains: searchString, mode: 'insensitive' } }],
        }
      : {};

    const data = await this.prisma.productItem.findMany({
      where: { ...whereClause, shopId },
      take: +limit,
      skip: +offset,
      orderBy: sortingColumn
        ? { [sortingColumn]: sort?.toLowerCase() || 'asc' }
        : { isFeatured: 'desc' },
      include: INCLUDE_BODY,
    });

    const transformedData = data.map((productItem) => ({
      ...productItem,
      recommendations: productItem.recommendations.map(
        (rec) => rec.productItem,
      ),
      recommendedBy: productItem.recommendedBy.map((rec) => rec.productItem),
    }));

    return transformedData as unknown as ProductItemEntity[];
  }

  async findOne(id: string): Promise<ProductItemEntity> {
    const data = await this.prisma.productItem.findUnique({
      where: { id },
      include: INCLUDE_BODY,
    });

    const transformedRecommendations = data?.recommendations?.map(
      (rec) => rec.productItem,
    );
    const transformedRecommendedBy = data?.recommendedBy?.map(
      (rec) => rec.productItem,
    );

    const transformedData = {
      ...data,
      recommendations: transformedRecommendations,
      recommendedBy: transformedRecommendedBy,
    };

    return transformedData as unknown as ProductItemEntity;
  }

  async update(
    id: string,
    data: ProductItemUpdateDto,
  ): Promise<ProductItemEntity> {
    const {
      colors,
      sizes,
      recommendations,
      recommendedBy,
      prices,
      careListId,
      categoryTypeId,
      currency,
      mediasUrl,
      ...rest
    } = data;

    const existingProduct = await this.prisma.productItem.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    if (
      recommendations &&
      recommendations.length > 0 &&
      isAllOfType(recommendations, 'string')
    ) {
      await this._updateRecommendations(id, recommendations);
    }

    if (
      recommendedBy &&
      recommendedBy.length > 0 &&
      isAllOfType(recommendedBy, 'string')
    ) {
      await this._updateRecommendedBy(id, recommendedBy);
    }

    const product = await this.prisma.productItem.update({
      where: { id },
      data: {
        ...rest,
        mediasUrl,
        currency: currency as Currency,
        colors: colors &&
          colors.length && {
            connect: colors.map((color) => ({ id: color })),
          },
        sizes: sizes &&
          sizes.length && {
            connect: sizes.map((size) => ({ id: size })),
          },
        prices: prices && prices.length && prices.toString(),
        careList: careListId && {
          connect: {
            id: careListId,
          },
        },
        categoryType: categoryTypeId && {
          connect: {
            id: categoryTypeId,
          },
        },
      },
      include: INCLUDE_BODY,
    });

    const transformedRecommendations = product.recommendations?.map(
      (rec) => rec.productItem,
    );
    const transformedRecommendedBy = product.recommendedBy?.map(
      (rec) => rec.productItem,
    );

    const transformedData = {
      ...product,
      recommendations: transformedRecommendations,
      recommendedBy: transformedRecommendedBy,
    };

    return transformedData as unknown as ProductItemEntity;
  }

  async remove(id: string): Promise<ProductItemEntity> {
    return this.prisma.productItem.delete({
      where: { id },
    }) as unknown as ProductItemEntity;
  }

  async decreaseProductStock(
    productItemId: string,
    quantity: number,
  ): Promise<void> {
    const existingProduct = await this.prisma.productItem.findUnique({
      where: { id: productItemId },
    });

    if (!existingProduct) {
      throw new NotFoundException(`Product with ID ${productItemId} not found`);
    }

    await this.prisma.productItem.update({
      where: { id: productItemId },
      data: {
        stock: {
          decrement: quantity,
        },
      },
    });
  }
}
