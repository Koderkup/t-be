import { registerAs } from '@nestjs/config';

export default registerAs('aws', () => ({
  bucket: {
    region: process.env.AWS_REGION,
    host: process.env.BUCKET_HOST,
    name: process.env.AWS_S3_BUCKET_NAME,
    folder: process.env.FILE_FOLDER,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
  s3: {
    endpoint: `https://${process.env.AWS_REGION}.${process.env.BUCKET_HOST}.com`,
    forcePathStyle: false,
  },
  middleware: {
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE, 10),
    maxFiles: parseInt(process.env.MAX_FILES, 10),
  },
  app: {
    uuid: process.env.SERVICE_ID,
  },
  url: `https://${process.env.BUCKET_NAME}.${process.env.BUCKET_REGION}.${process.env.BUCKET_HOST}.com/`,
}));
