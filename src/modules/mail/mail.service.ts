import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
// import { generateResetPasswordCode } from 'src/helpers/generateResetPasswordCode';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    // private readonly redis: RedisService,
  ) {}

  async sendResetPasswordCode(email: string, code: number) {
    let response: null | object;
    try {
      // const code = generateResetPasswordCode();

      response = await this.mailerService.sendMail({
        to: email,
        subject: 'Reset password code',
        template: './reset_password_email',
        context: {
          code,
        },
      });

      // await this.redis.set(email, code, 1000 * 60 * 10);
      // console.log('Reset password code', code);
    } catch {
      response = null;
    } finally {
      return response;
    }
  }
}
