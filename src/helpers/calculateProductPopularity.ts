import { OrderStatus } from '@prisma/client';
import popularity from '@root/constants/popularity.constant';
import { ProductItemForPopularity } from '@root/types/productItem/types';

export default function calculateProductPopularity(
  product: ProductItemForPopularity,
  currentDate: Date,
) {
  const { maxActualityAgeInDays, weight } = popularity;

  const productComment = product.Comment;
  const updatedDay = new Date(product.updatedAt || product.createdAt);

  const newnessInMs = currentDate.getTime() - updatedDay.getTime();
  const newnessInDays = newnessInMs / (1000 * 60 * 60 * 24);
  const newnessScore = 1 - Math.min(newnessInDays / maxActualityAgeInDays, 1);

  const salesCount = product.orderItems.filter(
    (orderItem) => orderItem.order.status === OrderStatus.Paid,
  ).length;
  const commentsCount = productComment.length;
  const averageRating =
    productComment
      .map((item) => item.rating)
      .reduce((prev, curr) => prev + curr, 0) / (commentsCount || 1);

  return (
    salesCount * weight.sales +
    commentsCount * weight.comments +
    averageRating * weight.rating +
    newnessScore * weight.newness
  );
}
