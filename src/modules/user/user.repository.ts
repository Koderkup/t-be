import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@services/prisma.service';
import { PaginationQueryDto } from '@validation/shared';
import { UserCreateDto, UserEntity, UserUpdateDto } from '@validation/user';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async createUser(userData: UserCreateDto): Promise<UserEntity> {
    const { shopId: id, role, password, ...rest } = userData;
    const data: Prisma.UserCreateInput = {
      ...rest,
      role: role || 'user',
      password: password,
    };
    if (id)
      data.shops = {
        connect: {
          id,
        },
      };
    return this.prisma.user.create({
      data,
    });
  }

  async findUsers(paginationQuery: PaginationQueryDto): Promise<UserEntity[]> {
    const { limit, offset, sortingColumn, sort, searchString } =
      paginationQuery;
    const UserModelInstance = Prisma.UserScalarFieldEnum;
    const validSortingColumns = Object.keys(UserModelInstance) as string[];

    if (sortingColumn && !validSortingColumns.includes(sortingColumn)) {
      throw new BadRequestException(
        `Invalid sorting column '${sortingColumn}'. List of valid columns: ${validSortingColumns}'.`,
      );
    }

    const whereClause: Prisma.UserWhereInput = searchString
      ? {
          OR: [{ email: { contains: searchString, mode: 'insensitive' } }],
        }
      : {};

    return this.prisma.user.findMany({
      where: whereClause,
      take: +limit,
      skip: +offset,
      orderBy: sortingColumn
        ? { [sortingColumn]: sort?.toLowerCase() || 'asc' }
        : undefined,
    });
  }

  async findUserById(id: string): Promise<UserEntity | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findUserByTelegramId(id: string): Promise<UserEntity | null> {
    return this.prisma.user.findFirst({ where: { telegramId: id } });
  }

  async updateUser(
    telegramId: string,
    data: UserUpdateDto,
  ): Promise<UserEntity> {
    const updateDto: Prisma.UserUpdateInput = { ...data };
    return this.prisma.user.update({
      data: updateDto,
      where: { telegramId },
    });
  }

  async deleteUser(id: string): Promise<UserEntity> {
    return this.prisma.user.delete({ where: { id } });
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
}
