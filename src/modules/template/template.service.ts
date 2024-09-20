import { Injectable } from '@nestjs/common';
import { TemplateRepository } from './template.repository';

@Injectable()
export class TemplateService {
  constructor(private readonly repository: TemplateRepository) {}

  async findAll() {
    return this.repository.findAll();
  }
}
