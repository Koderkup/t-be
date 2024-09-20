import {
  Injectable,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { UserPayment, Prisma } from '@prisma/client';
import { PrismaService } from '@services/prisma.service';
import {
  UserPaymentCreateDto,
  UserPaymentUpdateDto,
} from '@validation/user-payment';
import { PaginationQueryDto } from '@validation/shared';

@Injectable()
export class UserPaymentRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: UserPaymentCreateDto) {
    const { functionalityIds, ...rest } = data;

    const func = await this.prisma.userPayment
      .create({
        data: {
          ...rest,
          functionalities: {
            connect: functionalityIds.map((funcId) => ({ id: funcId })),
          },
        },
      })
      .catch((err) => {
        if (err instanceof Prisma.PrismaClientValidationError)
          throw new ForbiddenException(err.message);

        console.error(err);
      });

    return func;
  }

  async findAll(paginationQuery: PaginationQueryDto): Promise<UserPayment[]> {
    const { limit, offset, sortingColumn, sort, searchString } =
      paginationQuery;
    const userPaymentModelInstance = Prisma.UserPaymentScalarFieldEnum;
    const validSortingColumns = Object.keys(
      userPaymentModelInstance,
    ) as string[];

    if (sortingColumn && !validSortingColumns.includes(sortingColumn)) {
      throw new BadRequestException(
        `Invalid sorting column '${sortingColumn}'. List of valid columns: ${validSortingColumns}'.`,
      );
    }

    const whereClause: Prisma.UserPaymentWhereInput = searchString
      ? {
          OR: [
            {
              paymentIdentifier: {
                contains: searchString,
                mode: 'insensitive',
              },
            },
          ],
        }
      : {};

    return this.prisma.userPayment.findMany({
      where: whereClause,
      take: +limit,
      skip: +offset,
      orderBy: sortingColumn
        ? { [sortingColumn]: sort?.toLowerCase() || 'asc' }
        : undefined,
    });
  }

  async findOne(id: string): Promise<UserPayment | null> {
    return this.prisma.userPayment.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: UserPaymentUpdateDto) {
    const { functionalityIds, ...rest } = data;
    const updateDto: Prisma.UserPaymentUpdateInput = {
      ...rest,
    };

    if (functionalityIds)
      updateDto.functionalities = {
        connect: functionalityIds.map((id) => ({ id })),
      };

    return this.prisma.userPayment.update({
      where: { id },
      data: updateDto,
    });
  }

  async remove(id: string): Promise<UserPayment> {
    return this.prisma.userPayment.delete({
      where: { id },
    });
  }
}
