import {
  Controller,
  Get,
  Patch,
  Body,
  HttpStatus,
  Post,
  UseGuards,
  // Query,
  HttpCode,
  ParseUUIDPipe,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
  ApiQuery,
  ApiConsumes,
} from '@nestjs/swagger';
import { AppConfigurationsService } from './app-configuration.service';
import {
  AppConfigurationCreateDto,
  AppConfigurationEntity,
  AppConfigurationUpdateDto,
  // EmailUserInputDto,
} from 'src/validation/dto/app-configuration';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RoutesEntities } from '@root/constants/routes-entities';
import { AwsExtractLink } from '@root/interceptors/aws-media.interseptor';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploaderService } from '@modules/uploader/uploader.service';

@ApiTags(RoutesEntities.APP_CONFIGURATIONS)
@Controller(RoutesEntities.APP_CONFIGURATIONS)
export class AppConfigurationsController {
  constructor(
    private readonly service: AppConfigurationsService,
    private readonly uploaderService: UploaderService,
  ) {}

  @ApiBearerAuth('jwt')
  //@UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create an ad block' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The ad block has been successfully created.',
    type: AppConfigurationEntity,
  })
  @ApiBody({ type: AppConfigurationCreateDto })
  @HttpCode(201)
  async create(@Body() createDto: AppConfigurationCreateDto) {
    return this.service.create(createDto);
  }

  @AwsExtractLink()
  @Get()
  @ApiOperation({ summary: 'Get current configuration' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return current configuration.',
    type: AppConfigurationEntity,
  })
  @ApiQuery({
    name: 'shopId',
    description: 'Unique shop identifier',
    example: 'a2d4f3b1-e034-42f5-bb09-5f84b0f307a3',
    required: false,
  })
  async find(
    @Query('shopId', new ParseUUIDPipe({ optional: true })) shopId?: string,
  ) {
    return this.service.findConfiguration({ shopId });
  }

  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  @AwsExtractLink()
  @UseInterceptors(FileInterceptor('mediaUrl'))
  @Patch()
  @ApiOperation({ summary: 'Update configuration' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Configuration has been successfully updated.',
    type: AppConfigurationEntity,
  })
  @ApiQuery({
    name: 'shopId',
    required: false,
    description: 'It need for redis logging any info about actions with shop',
    example: 'a2d4f3b1-e034-42f5-bb09-5f84b0f307a3',
  })
  @ApiConsumes('multipart/form-data')
  async update(
    @Body() configData: AppConfigurationUpdateDto,
    @Query('shopId', new ParseUUIDPipe({ optional: true })) shopId?: string,
    @UploadedFile() mediaUrl?: Express.Multer.File,
  ) {
    const fileUrl: string | null =
      mediaUrl && (await this.uploaderService.uploadFile(mediaUrl));

    return this.service.updateConfiguration(
      {
        ...configData,
        mediaUrl:
          fileUrl || this.uploaderService.getKeyByMediaUrl(configData.mediaUrl),
      },
      shopId,
    );
  }

  // @Post('send-email')
  // @ApiOperation({ summary: 'Send an email based on user input' })
  // @ApiResponse({
  //   status: HttpStatus.OK,
  //   description: 'Email has been successfully sent.',
  // })
  // @ApiQuery({
  //   name: 'shopId',
  //   required: false,
  //   description: 'It need for redis logging any info about actions with shop',
  // })
  // async sendEmailFromUserInput(
  //   @Body() userInput: EmailUserInputDto,
  //   @Query('shopId') shopId: string,
  // ) {
  //   return this.service.sendUserInputEmail(userInput, shopId);
  // }
}
