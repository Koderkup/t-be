import { Injectable, NotFoundException } from '@nestjs/common';
import { UserPaymentRepository } from './user-payment.repository';
import { UserPayment } from '@prisma/client';
import { PaginationQueryDto } from 'src/validation/dto/shared';
import {
  UserPaymentCreateDto,
  UserPaymentUpdateDto,
} from 'src/validation/dto/user-payment';

@Injectable()
export class UserPaymentService {
  constructor(private readonly repository: UserPaymentRepository) {}

  async create(data: UserPaymentCreateDto) {
    return this.repository.create(data);
  }

  findAll(paginationQuery: PaginationQueryDto): Promise<UserPayment[]> {
    return this.repository.findAll(paginationQuery);
  }

  async findOne(id: string) {
    const payment = await this.repository.findOne(id);

    if (!payment) throw new NotFoundException('Promotional payment not found');

    return payment;
  }

  async update(id: string, data: UserPaymentUpdateDto): Promise<UserPayment> {
    return this.repository.update(id, data);
  }

  remove(id: string): Promise<UserPayment> {
    return this.repository.remove(id);
  }
}
