import { Injectable } from '@nestjs/common';
import { CustomerRepository } from './customer.repository';
import { Currency } from '@prisma/client';
import { PaginationQueryDto } from 'src/validation/dto/shared';
import { CreateCustomerDto } from '@validation/customer/create-customer.dto';

@Injectable()
export class CustomerService {
  constructor(private readonly repository: CustomerRepository) {}

  async createCustomer(createDto: CreateCustomerDto) {
    return this.repository.createCustomer(createDto);
  }

  async updatePreferredCurrency(telegramID: string, currency: Currency) {
    return this.repository.updatePreferredCurrency(telegramID, currency);
  }

  async getAvailableCurrencies() {
    return this.repository.getAvailableCurrencies();
  }

  async getAllCustomers(paginationQuery: PaginationQueryDto) {
    return this.repository.getAllCustomers(paginationQuery);
  }
}
