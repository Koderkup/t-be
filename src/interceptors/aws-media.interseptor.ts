import { UploaderService } from '@modules/uploader/uploader.service';
import {
  CallHandler,
  ExecutionContext,
  Inject,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

export function AwsExtractLink() {
  return UseInterceptors(AwsLinkInterceptor);
}

export class AwsLinkInterceptor implements NestInterceptor {
  constructor(
    @Inject(UploaderService)
    private readonly storageService: UploaderService,
  ) {}
  intercept(
    context: ExecutionContext,
    handler: CallHandler,
  ): Observable<unknown> {
    return handler.handle().pipe(
      map((data: unknown) => {
        return this.getLinkByKey(data);
      }),
    );
  }

  async getLinkByKey(dto: any) {
    const stack = [{ dto }];

    while (stack.length > 0) {
      const currentObj = stack.pop();
      for (const key in currentObj.dto) {
        if (typeof currentObj.dto[key] === 'object') {
          stack.push({ dto: currentObj.dto[key] });
        }
        if (
          (key === 'mediaUrl' || key === 'mediasUrl') &&
          currentObj.dto[key]
        ) {
          if (Array.isArray(currentObj.dto[key])) {
            currentObj.dto[key] = await Promise.all(
              currentObj.dto[key].map((k) =>
                this.storageService.getMediaUrlByKey(k),
              ),
            );
          } else {
            currentObj.dto[key] = await this.storageService.getMediaUrlByKey(
              currentObj.dto[key],
            );
          }
        }
      }
    }
    return dto;
  }
}
