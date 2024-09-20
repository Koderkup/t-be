import { Prisma } from '@prisma/client';

export type ProductItemForRecommendation = Prisma.ProductItemGetPayload<{
  select: {
    id: true;
    name: true;
    descriptionShort: true;
    categoryType: {
      select: {
        name: true;
        subcategories: true;
      };
    };
    colors: true;
  };
}>;

export type ProductItemForPopularity = Prisma.ProductItemGetPayload<{
  select: {
    id: true;
    Comment: true;
    orderItems: {
      include: {
        order: true;
      };
    };
    createdAt: true;
    updatedAt: true;
  };
}>;
