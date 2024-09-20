import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/services/prisma.service';
import {
  DashboardCreateDto,
  DashboardEntity,
  DashboardUpdateDto,
} from 'src/validation/dto/dashboard';
import { PaginationQueryDto } from 'src/validation/dto/shared';

@Injectable()
export class DashboardRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(dashboardData: DashboardCreateDto) {
    const dashboard = await this.prisma.dashboard.create({
      data: dashboardData,
    });

    return dashboard;
  }

  async findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset, sortingColumn, sort, searchString } =
      paginationQuery;

    const dashboardModelInstance = Prisma.DashboardScalarFieldEnum;
    const validSortingColumns = Object.keys(dashboardModelInstance) as string[];

    if (sortingColumn && !validSortingColumns.includes(sortingColumn)) {
      throw new BadRequestException(
        `Invalid sorting column '${sortingColumn}'. List of valid columns: ${validSortingColumns}'.`,
      );
    }

    const whereClause: Prisma.DashboardWhereInput = searchString
      ? {
          OR: [
            { logs: { contains: searchString, mode: 'insensitive' } },
            { analytics: { contains: searchString, mode: 'insensitive' } },
            { notifications: { contains: searchString, mode: 'insensitive' } },
          ],
        }
      : {};

    const dashboards = await this.prisma.dashboard.findMany({
      where: whereClause,
      take: limit,
      skip: offset,
    });

    return dashboards;
  }

  async findById(id: string) {
    const dashboard = await this.prisma.dashboard.findUnique({
      where: { id },
    });

    if (!dashboard) return null;
    return dashboard;
  }

  async update(
    id: string,
    dashboardData: DashboardUpdateDto,
  ): Promise<DashboardEntity> {
    const existingDashboard = await this.prisma.dashboard.findUnique({
      where: { id },
    });

    if (!existingDashboard) {
      throw new NotFoundException(`Dashboard with ID ${id} not found`);
    }

    const transformedData: Prisma.DashboardUpdateInput = {
      logs: dashboardData.logs,
      analytics: dashboardData.analytics,
      notifications: dashboardData.notifications,
    };

    const dashboard = await this.prisma.dashboard.update({
      where: { id },
      data: transformedData,
    });

    return dashboard;
  }

  async delete(id: string): Promise<DashboardEntity> {
    const deletedDashboard = await this.prisma.dashboard.delete({
      where: { id },
    });
    return deletedDashboard as unknown as DashboardEntity;
  }

}
