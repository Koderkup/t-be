import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
  ApiConsumes,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import {
  UserCreateDto,
  UserUpdateDto,
  UserEntity,
  UserLoginDto,
  ResetPasswordDto,
} from 'src/validation/dto/user';
import { PaginationQueryDto, EmailDto } from '@validation/shared';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthService } from '../auth/auth.service';
import { RoutesEntities } from '@root/constants/routes-entities';
import { AwsExtractLink } from '@root/interceptors/aws-media.interseptor';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploaderService } from '@modules/uploader/uploader.service';

class LoginResponseDto {
  access_token: string;
}

@ApiTags(RoutesEntities.USERS)
@Controller(RoutesEntities.USERS)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly uploaderService: UploaderService,
  ) {}

  @ApiBearerAuth('jwt')
  //@UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The user has been successfully created.',
    type: UserEntity,
  })
  @ApiQuery({
    name: 'shopId',
    required: false,
    description:
      'It needed when the user has already created a store and creates an "admin" user',
  })
  @HttpCode(201)
  async createUser(
    @Body() userData: UserCreateDto,
    //@Query('shopId') shopId?: string,
  ) {
    return this.userService.createUser(userData);
  }

  // @ApiBearerAuth('jwt')
  // @UseGuards(JwtAuthGuard)
  // @AwsExtractLink()
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return all users.',
    type: [UserEntity],
  })
  async findUsers(@Query() paginationQuery: PaginationQueryDto) {
    return this.userService.findUsers(paginationQuery);
  }

  // @ApiBearerAuth('jwt')
  // @UseGuards(JwtAuthGuard)
  // @AwsExtractLink()
  @Get('by-userId/:id')
  @ApiOperation({ summary: 'Get a user by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The user details.',
    type: UserEntity,
  })
  async findUserById(@Param('id') id: string) {
    return this.userService.findUserById(id);
  }

  // @ApiBearerAuth('jwt')
  // @UseGuards(JwtAuthGuard)
  // @AwsExtractLink()
  @Get('by-telegramId/:telegramId')
  @ApiOperation({ summary: 'Get a user by telegram id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The user details.',
    type: UserEntity,
  })
  async findUserByTelegramId(@Param('telegramId') telegramId: string) {
    return this.userService.findUserByTelegramId(telegramId);
  }

  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  @AwsExtractLink()
  @UseInterceptors(FileInterceptor('mediaUrl'))
  @Patch(':telegramId')
  @ApiOperation({ summary: 'Update a user by telegram id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The user has been successfully updated.',
    type: UserEntity,
  })
  @ApiConsumes('multipart/form-data')
  async updateUser(
    @Param('telegramId') telegramId: string,
    @Body() userData: UserUpdateDto,
    @UploadedFile() mediaUrl?: Express.Multer.File,
  ) {
    const fileUrl: string | null =
      mediaUrl && (await this.uploaderService.uploadFile(mediaUrl));
    return this.userService.updateUser(telegramId, {
      ...userData,
      mediaUrl:
        fileUrl || this.uploaderService.getKeyByMediaUrl(userData.mediaUrl),
    });
  }

  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The user has been successfully deleted.',
    type: UserEntity,
  })
  @ApiQuery({
    name: 'shopId',
    //required for logging this event
    required: true,
    description: 'It need for redis logging any info about actions with shop',
  })
  async deleteUser(@Param('id') id: string, @Query('shopId') shopId: string) {
    return this.userService.deleteUser(id, shopId);
  }

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User logged in successfully.',
    type: LoginResponseDto,
  })
  async login(@Body() loginDto: UserLoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('forgot_password')
  @ApiOperation({ summary: "Send the password reset code to user's email" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Password reset code sent successfully.',
    type: null,
  })
  async forgotPassword(@Body() { email }: EmailDto) {
    return this.authService.forgotPassword(email);
  }

  @Post('reset_password')
  @ApiOperation({ summary: 'Change password' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Password was successfully changed.',
    type: UserEntity,
  })
  async resetPassword(@Body() resetPassword: ResetPasswordDto) {
    return this.authService.resetPassword(resetPassword);
  }
}
