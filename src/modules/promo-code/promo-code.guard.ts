import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { FunctionalityType } from '@prisma/client';
import { PrismaService } from '@services/prisma.service';

@Injectable()
export class PromoCodeGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const shopId = request.body.shopId || request.query.shopId;

    if (await this.isBlocked(shopId)) {
      throw new ForbiddenException(
        'Access to promo codes is blocked for this shop.',
      );
    }

    return true;
  }

  private async isBlocked(shopId: string) {
    const foundShop = await this.prisma.shop.findFirst({
      where: {
        id: shopId,
      },
      include: {
        functionalities: true,
      },
    });

    return foundShop
      ? !foundShop.functionalities.some(
          (func) => func.type === FunctionalityType.PromoCode,
        )
      : true;
  }
}
