import { Injectable, NotFoundException } from '@nestjs/common';
import { DashboardRepository } from './dashboard.repository';
import {
  DashboardCreateDto,
  DashboardUpdateDto,
  DashboardEntity,
} from 'src/validation/dto/dashboard';
import { PaginationQueryDto } from 'src/validation/dto/shared';

@Injectable()
export class DashboardService {
  constructor(private readonly repository: DashboardRepository) {}

  async create(dashboardData: DashboardCreateDto): Promise<DashboardEntity> {
    return this.repository.create(dashboardData);
  }

  async findAll(
    paginationQuery: PaginationQueryDto,
  ): Promise<DashboardEntity[]> {
    return this.repository.findAll(paginationQuery);
  }

  async findById(id: string) {
    const dashboard = await this.repository.findById(id);

    if (!dashboard) throw new NotFoundException('Dashboard not found');

    return dashboard;
  }

  async update(
    id: string,
    dashboardData: DashboardUpdateDto,
  ): Promise<DashboardEntity> {
    return this.repository.update(id, dashboardData);
  }

  async delete(id: string): Promise<DashboardEntity> {
    return this.repository.delete(id);
  }
}
