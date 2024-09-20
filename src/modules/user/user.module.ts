import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { PrismaService } from '@services/prisma.service';
import { AuthModule } from '../auth/auth.module';
import { UploaderModule } from '@modules/uploader/uploader.module';

@Module({
  imports: [forwardRef(() => AuthModule), UploaderModule],
  controllers: [UserController],
  providers: [UserService, UserRepository, PrismaService],
  exports: [UserService],
})
export class UserModule {}
