import { Injectable } from '@nestjs/common';
import { OrderStatus, SegmentType } from '@prisma/client';
import { PrismaService } from 'src/services/prisma.service';
import {
  SegmentCreateDto,
  SegmentEntity,
  SegmentQueryDto,
  SegmentUpdateDto,
} from 'src/validation/dto/segment';
import { ShopService } from '../shop/shop.service';
import { CustomerEntity } from 'src/validation/dto/customer';

@Injectable()
export class SegmentItemRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly shopService: ShopService,
  ) {}
  async create(data: SegmentCreateDto): Promise<SegmentEntity> {
    return await this.prisma.segment.create({
      data,
    });
  }

  async findOneById(id: string): Promise<SegmentEntity | null> {
    return await this.prisma.segment.findUnique({
      where: { id },
    });
  }

  async findOneByType(type: SegmentType): Promise<SegmentEntity | null> {
    return await this.prisma.segment.findUnique({
      where: { type },
    });
  }

  async findAll(): Promise<Array<SegmentEntity>> {
    return await this.prisma.segment.findMany();
  }

  async getCustomersBySegmentType(
    type: SegmentType,
    query: SegmentQueryDto,
  ): Promise<Array<string>> {
    const { shopId, days = 1 } = query;
    const dateLastLogged = new Date();
    dateLastLogged.setDate(dateLastLogged.getDate() - days);

    let customers: Array<CustomerEntity> = [];

    await this.shopService.findOne(shopId);

    switch (type) {
      case SegmentType.WithOrders:
        customers = (await this.prisma.customer.findMany({
          where: { orders: { some: {} }, shopId },
        })) as unknown as Array<CustomerEntity>;
        break;

      case SegmentType.WithoutOrders:
        customers = (await this.prisma.customer.findMany({
          where: { orders: { none: {} }, shopId },
        })) as unknown as Array<CustomerEntity>;
        break;

      case SegmentType.PendingStatus:
        customers = (await this.prisma.customer.findMany({
          where: { orders: { some: { status: OrderStatus.Pending } }, shopId },
        })) as unknown as Array<CustomerEntity>;
        break;

      case SegmentType.InactiveCustomers:
        customers = (await this.prisma.customer.findMany({
          where: { lastLogin: { lte: dateLastLogged }, shopId },
        })) as unknown as Array<CustomerEntity>;
        break;
    }

    return customers.map(({ telegramID }) => telegramID);
  }

  async update(id: string, data: SegmentUpdateDto): Promise<SegmentEntity> {
    const existingSegment = this.findOneById(id);

    return await this.prisma.segment.update({
      where: { id },
      data: {
        ...existingSegment,
        ...data,
      },
    });
  }

  async remove(id: string): Promise<SegmentEntity> {
    return this.prisma.segment.delete({
      where: { id },
    });
  }
}
