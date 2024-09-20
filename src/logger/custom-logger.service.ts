import { ConsoleLogger, Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class CustomLoggerService
  extends ConsoleLogger
  implements LoggerService
{
  log(message: string): void {
    super.log(message);
  }

  error(message: string): void {
    super.error(message);
  }

  warn(message: string): void {
    super.warn(message);
  }

  debug(message: string): void {
    super.debug(message);
  }

  verbose(message: string): void {
    super.log(message);
  }
}
