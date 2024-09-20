import { BadRequestException, createParamDecorator, ExecutionContext, NotFoundException } from '@nestjs/common';
import { Request } from 'express';
import { validate as isValidUUID } from 'uuid';
export const ShopId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    if(!request.query.shopId) throw new NotFoundException('shopId is required');
    if (!isValidUUID(request.query.shopId)) throw new BadRequestException('shopId is not a uuid');
    return request.query.shopId;
  },
);
