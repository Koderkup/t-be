import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { Currency, Prisma } from '@prisma/client';
import { CurrencyNameMapping } from 'src/helpers/currency';
import { PaginationQueryDto } from 'src/validation/dto/shared';
import { CreateCustomerDto } from '@validation/customer/create-customer.dto';

@Injectable()
export class CustomerRepository {
  constructor(private prisma: PrismaService) {}

  async createCustomer(createDto: CreateCustomerDto) {
    return this.prisma.customer.create({ data: createDto });
  }

  async updatePreferredCurrency(telegramID: string, currency: Currency) {
    const config = await this.prisma.appConfiguration.findFirst({
      select: { shopCurrencies: true },
    });

    if (!config) throw new BadRequestException('Configuration not found');
    if (!config.shopCurrencies.includes(currency))
      throw new BadRequestException('Not permitted currency');

    return await this.prisma.customer
      .update({
        where: { telegramID },
        data: { preferredCurrency: currency },
      })
      .catch((err) => err);
  }

  async getAvailableCurrencies(): Promise<{ value: string; label: string }[]> {
    const config = await this.prisma.appConfiguration.findFirst({
      select: { shopCurrencies: true },
    });

    if (!config) throw new Error('Configuration not found');

    return config.shopCurrencies.map((currency) => ({
      value: currency,
      label: CurrencyNameMapping[currency],
    }));
  }

  async getAllCustomers(paginationQuery: PaginationQueryDto) {
    const { limit, offset, sortingColumn, sort, searchString } =
      paginationQuery;
    const customerTypeModelInstance = Prisma.CustomerScalarFieldEnum;
    const validSortingColumns = Object.keys(
      customerTypeModelInstance,
    ) as string[];

    if (sortingColumn && !validSortingColumns.includes(sortingColumn)) {
      throw new BadRequestException(
        `Invalid sorting column '${sortingColumn}'. List of valid columns: ${validSortingColumns}'.`,
      );
    }

    const whereClause: Prisma.CustomerWhereInput = searchString
      ? {
          OR: [{ telegramID: { contains: searchString, mode: 'insensitive' } }],
        }
      : {};

    return this.prisma.customer.findMany({
      where: whereClause,
      take: +limit,
      skip: +offset,
      orderBy: sortingColumn
        ? { [sortingColumn]: sort?.toLowerCase() || 'asc' }
        : undefined,
      select: {
        telegramID: true,
        preferredCurrency: true,
      },
    });
  }
}
