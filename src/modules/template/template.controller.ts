import { Controller, Get, HttpStatus } from '@nestjs/common';
import { TemplateService } from './template.service';
import { AwsExtractLink } from '@root/interceptors/aws-media.interseptor';
import { RoutesEntities } from '@root/constants/routes-entities';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Template } from '@validation/template/template.entity';

@AwsExtractLink()
@ApiTags(RoutesEntities.TEMPLATES)
@Controller(RoutesEntities.TEMPLATES)
export class TemplateController {
  constructor(private readonly templatesService: TemplateService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all templates',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of templates',
    type: [Template],
  })
  async findAll() {
    return this.templatesService.findAll();
  }
}
