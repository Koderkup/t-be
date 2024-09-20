import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import {
  ResetPasswordDto,
  UserCreateDto,
  UserEntity,
  UserLoginDto,
} from 'src/validation/dto/user';
import { MailService } from '../mail/mail.service';
import { generateResetPasswordCode } from 'src/helpers/generateResetPasswordCode';
import { JwtPayload } from '@interfaces/jwt-payload.interface';
import { RedisService } from '@modules/redis/redis.service';
import { ONE_MINUTE } from '@root/constants/uploader.constant';
import { IRedisLog, MsgType } from '@interfaces/redis-logs.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly redis: RedisService,
  ) {}
  async getPayloadFromJWT(token: string) {
    return this.jwtService.decode<JwtPayload>(token);
  }

  async validateUser(email: string, pass: string): Promise<UserEntity> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async login(data: UserLoginDto) {
    const user = await this.validateUser(data.email, data.password);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...userInfo } = user;
    const payload = { ...userInfo };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(userDto: UserCreateDto): Promise<UserEntity> {
    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    const newUser = await this.userService.createUser({
      ...userDto,
      password: hashedPassword,
    });
    return newUser;
  }

  async forgotPassword(email: string) {
    let statusCode = HttpStatus.NOT_FOUND;
    try {
      const user = await this.userService.findOneByEmail(email);
      const code = generateResetPasswordCode();
      const response = await this.mailService.sendResetPasswordCode(
        user.email,
        code,
      );

      if (!response) {
        statusCode = HttpStatus.SERVICE_UNAVAILABLE;
        throw new RequestTimeoutException('Email service unavailable');
      }
      
      const timestamp = new Date().getTime();
      const log: IRedisLog = {
        timestamp,
        msgType: MsgType.INFO,
        message: code.toString(),
      };
      await this.redis.set(email, log, ONE_MINUTE * 10);
      console.log('Reset password code', code);
    } catch (error) {
      throw new HttpException((error as Error).message, statusCode);
    }
  }

  async resetPassword({ email, code, password }: ResetPasswordDto) {
    const user = await this.userService.updatePassword(email, password);
    const resetCode = await this.redis.get(email);

    console.log(resetCode);

    if (!resetCode)
      throw new BadRequestException('Reset code expired or not exist');
    if (+resetCode !== code) throw new BadRequestException('Reset code invalid');

    await this.redis.del(email);

    return user;
  }
}
