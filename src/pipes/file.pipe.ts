import { PipeTransform, Injectable } from '@nestjs/common';

const byteLimit = 20e6;

interface FilesStructure {
  contents?: File[];
  image?: File[];
  gif?: File[];
  video?: File[];
  buffer?: Buffer;
  size?: number;
}

@Injectable()
export class FileValidationPipe implements PipeTransform {
  async transform(files: FilesStructure | null) {
    if (
      (files?.contents && files?.contents.length !== 0) ||
      (files?.image && files?.image.length !== 0) ||
      (files?.gif && files?.gif.length !== 0) ||
      (files?.video && files?.video.length !== 0)
    ) {
      return this.handlerFiles(files);
    }

    if (!files || !files?.buffer) {
      return false;
    }
    if (files.size > byteLimit) {
      throw new Error('File too large');
    }

    return files;
  }

  async handlerFiles(files: FilesStructure | null) {
    const commonFiles = [];
    commonFiles.push(
      !files?.contents ? null : files.contents[0],
      !files?.image ? null : files.image[0],
      !files?.gif ? null : files.gif[0],
      !files?.video ? null : files.video[0],
    );

    for (const file of commonFiles) {
      if (!file) {
        continue;
      }
      if (file.size > byteLimit) {
        throw new Error('File too large');
      }
    }
    return files;
  }
}
