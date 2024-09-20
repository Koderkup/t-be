import { Module } from '@nestjs/common';
import { UploaderService } from './uploader.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigType } from '@nestjs/config';
import awsConfig from '@cfg/aws.config';
import { S3Client } from '@aws-sdk/client-s3';
import { AWS_CLIENT } from '@root/constants/custom.providers';
import { CustomLoggerModule } from '@root/logger/custom-logger.module';

@Module({
  imports: [ConfigModule, CustomLoggerModule],
  providers: [
    UploaderService,
    {
      provide: AWS_CLIENT,
      useFactory: (configService: ConfigService) => {
        const config: ConfigType<typeof awsConfig> = configService.get('aws');
        return new S3Client({
          region: config.bucket.region,
          credentials: {
            accessKeyId: config.bucket.accessKeyId,
            secretAccessKey: config.bucket.secretAccessKey,
          },
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [UploaderService],
})
export class UploaderModule {}
