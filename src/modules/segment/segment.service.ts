import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SegmentCreateDto, SegmentQueryDto } from 'src/validation/dto/segment';
import { SegmentUpdateDto } from 'src/validation/dto/segment';
import { SegmentItemRepository } from './segment.repository';
import { SegmentType } from '@prisma/client';

@Injectable()
export class SegmentService {
  constructor(private readonly repository: SegmentItemRepository) {}
  async create(segmentCreateDto: SegmentCreateDto) {
    const { type } = segmentCreateDto;
    const existingSegment = await this.repository.findOneByType(type);

    if (existingSegment) {
      throw new ConflictException(`Segments with type ${type} already exist`);
    }
    return await this.repository.create(segmentCreateDto);
  }

  async findAll() {
    return await this.repository.findAll();
  }

  private async findOneById(id: string) {
    const existingSegment = await this.repository.findOneById(id);

    if (!existingSegment) {
      throw new NotFoundException(`Segment with id ${id} not found`);
    }

    return existingSegment;
  }

  private async findOneByType(type: SegmentType) {
    if (!this.isValidSegmentType(type)) {
      throw new BadRequestException('Invalid segment type');
    }

    const existingSegment = await this.repository.findOneByType(type);

    if (!existingSegment) {
      throw new NotFoundException(`Segments with type ${type} not found`);
    }
    return existingSegment;
  }

  async getCustomersBySegmentType(type: SegmentType, query: SegmentQueryDto) {
    await this.findOneByType(type);

    return await this.repository.getCustomersBySegmentType(type, query);
  }

  async update(id: string, segmentUpdateDto: SegmentUpdateDto) {
    await this.findOneById(id);
    const { type } = segmentUpdateDto;
    if (type) {
      const existingSegment = await this.repository.findOneByType(type);

      if (existingSegment) {
        throw new ConflictException(`Segments with type ${type} already exist`);
      }
    }

    return await this.repository.update(id, segmentUpdateDto);
  }

  async remove(id: string) {
    await this.findOneById(id);
    return await this.repository.remove(id);
  }

  private isValidSegmentType(type: any): boolean {
    return Object.values(SegmentType).includes(type);
  }
}
