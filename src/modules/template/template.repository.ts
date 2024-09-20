import { Injectable } from '@nestjs/common';
import { PrismaService } from '@services/prisma.service';

@Injectable()
export class TemplateRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.template.findMany();
  }
}
