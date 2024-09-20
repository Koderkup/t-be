import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import * as sharp from 'sharp';
import { PassThrough, Readable } from 'stream';
import {
  QUALITY_ARRAY,
  MAX_IMAGE_SIZE_BYTES,
  ONE_MINUTE,
  BIG_FILE_EXCEPTION,
  MAX_VIDEO_SIZE_BYTES,
} from '@const/uploader.constant';
import * as ffmpeg from 'fluent-ffmpeg';
import * as ffmpegPath from 'ffmpeg-static';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { randomBytes } from 'crypto';
import { Upload } from '@aws-sdk/lib-storage';
import { ConfigType } from '@nestjs/config';
import awsConfig from '@cfg/aws.config';
import { AWS_CLIENT } from '@root/constants/custom.providers';
import { CustomLoggerService } from '@root/logger/custom-logger.service';

@Injectable()
export class UploaderService implements OnModuleInit {
  private loggerService = new Logger(UploaderService.name);
  constructor(
    @Inject(AWS_CLIENT)
    private readonly client: S3Client,
    @Inject(awsConfig.KEY)
    private readonly configAws: ConfigType<typeof awsConfig>,
    private readonly logger: CustomLoggerService,
  ) {}

  private _generateFileName(fileType: string) {
    return `${randomBytes(8).toString('hex')}.${fileType}`;
  }

  private async _compressImage(buffer: Buffer): Promise<Buffer> {
    try {
      const image = sharp(buffer);
      const { format } = await image.metadata();

      if (format === 'heif') {
        return buffer;
      }

      return sharp(buffer).webp({ quality: QUALITY_ARRAY[0] }).toBuffer();
    } catch (error) {
      this.loggerService.error('Error converting image:', error);
      throw new Error(`Error converting image: ${error}`);
    }
  }

  private async _compressVideoAndUpload(
    multerStream: Readable,
    Key: string,
    fileSize: number,
  ) {
    const helpStream = new PassThrough();

    try {
      const parallelUpload = new Upload({
        client: this.client,
        params: {
          Bucket: this.configAws.bucket.name,
          Key,
          Body: helpStream,
          ContentLength: fileSize,
        },
        queueSize: 2,

        // (optional) size of each part, in bytes, at least 5MB
        partSize: 1024 * 1024 * 5,

        // (optional) when true, do not automatically call AbortMultipartUpload when
        // a multipart upload fails to complete. You should then manually handle
        // the leftover parts.
        leavePartsOnError: false,
      });

      parallelUpload.on('httpUploadProgress', (progress) => {
        this.loggerService.log(progress);
      });
      ffmpeg(multerStream)
        .videoCodec('libx264')
        .audioCodec('aac')
        .outputFormat('mp4')
        .outputOptions(['-movflags frag_keyframe+empty_moov'])
        .addOptions(['-crf 32'])
        .pipe(helpStream, { end: true });
      await parallelUpload.done();
    } catch (error) {
      this.loggerService.error('Error converting video:', error);
      throw new InternalServerErrorException('Error uploading video');
    }
  }

  async uploadFile(file: Express.Multer.File) {
    this.logger.log(`Uploading file: ${file.originalname}`);
    const fileType = file.mimetype;
    const fileSize = file.size;
    let compressedFile: Buffer;
    const fileName = this._generateFileName(
      fileType.includes('video') ? 'mp4' : 'webp',
    );

    if (fileType.includes('image')) {
      if (fileSize > MAX_IMAGE_SIZE_BYTES) {
        throw new HttpException(
          BIG_FILE_EXCEPTION(fileSize, MAX_IMAGE_SIZE_BYTES),
          HttpStatus.PAYLOAD_TOO_LARGE,
        );
      }

      compressedFile = await this._compressImage(file.buffer);

      const command = new PutObjectCommand({
        Bucket: this.configAws.bucket.name,
        Key: fileName,
        Body: compressedFile,
        ContentType: fileType,
      });
      //тут вроде можно в 1 запрос если дать s3:Put permission нужно протестить
      await this.client.send(command);

      return fileName;
      //return await getSignedUrl(
      //  this.client,
      //  new GetObjectCommand({
      //    Bucket: 'tapply',
      //    Key: fileName,
      //  }),
      //  {
      //    expiresIn: ONE_MINUTE * 5,
      //  },
      //);
    }

    if (fileType.includes('video')) {
      if (fileSize > MAX_VIDEO_SIZE_BYTES)
        throw new HttpException(
          BIG_FILE_EXCEPTION(fileSize, MAX_VIDEO_SIZE_BYTES),
          HttpStatus.PAYLOAD_TOO_LARGE,
        );

      await this._compressVideoAndUpload(file.stream, fileName, file.size);

      return fileName;
      //return getSignedUrl(
      //  this.client,
      //  new GetObjectCommand({
      //    Bucket: this.bucketData.name,
      //    Key: fileName,
      //  }),
      //  {
      //    expiresIn: ONE_MINUTE * 5,
      //  },
      //);
    }
  }

  public async deleteFile(Key: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: this.configAws.bucket.name,
      Key,
    });
    this.client
      .send(command)
      .then(() => this.loggerService.log('File deleted successfully'))
      .catch((error) => {
        this.loggerService.error(error);
        throw new InternalServerErrorException(`Error deleting file ${Key}`);
      });
  }

  async getMediaUrlByKey(key: string) {
    return getSignedUrl(
      this.client,
      new GetObjectCommand({
        Bucket: this.configAws.bucket.name,
        Key: key,
      }),
      {
        expiresIn: ONE_MINUTE * 5,
      },
    );
  }

  getKeyByMediaUrl(url: string) {
    const regex = /([a-zA-Z0-9]+\.webp)/;
    const match = url?.match(regex);
    const res = match ? match[0] : null;
    return res;
  }

  async mediasUrlParse(arr: Array<string | Express.Multer.File>) {
    return arr.length
      ? await Promise.all(
          arr.map((media) => {
            if (typeof media === 'string') {
              if ((media as string).startsWith('http')) {
                return this.getKeyByMediaUrl(media);
              }
            } else {
              return this.uploadFile(media as Express.Multer.File);
            }
          }),
        )
      : [];
  }

  onModuleInit() {
    ffmpeg.setFfmpegPath(ffmpegPath as any);
  }
}
