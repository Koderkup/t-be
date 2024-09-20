import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './user.repository';
import { PaginationQueryDto } from '@validation/shared';
import { UserCreateDto, UserUpdateDto, UserEntity } from '@validation/user';
import { ONE_WEEK_IN_SECOND } from '@root/constants/uploader.constant';
import { RedisService } from '@modules/redis/redis.service';
import { IRedisLog, MsgType } from '@interfaces/redis-logs.interface';

@Injectable()
export class UserService {
  constructor(
    private readonly repository: UserRepository,
    private readonly redis: RedisService,
  ) {}

  async createUser(data: UserCreateDto): Promise<UserEntity> {
    let hashedPassword = null;
    if (data.password) hashedPassword = await bcrypt.hash(data.password, 10);
    //if(!shopId)
    //const timestamp = new Date().getTime();
    //const redis_record_key = `${shopId ? `${shopId}__` : ''}anonymous__${new Date().getTime()}`;
    //const log: IRedisLog = {
    //  timestamp,
    //  msgType: MsgType.WARNING,
    //  message: `Order with ID${id} canceled`,
    //};

    //const redis_record_key = `${new Date().getTime()}__${data.shopId}`;
    //const log = `${colors.yellow(`New admin ${data.firstname} ${data.lastname}`)}`;
    //if (data.role == Role.admin) {
    //  await this.redis.set(redis_record_key, log, ONE_WEEK_IN_SECOND);
    //}

    return this.repository.createUser({ ...data, password: hashedPassword });
  }

  findUsers(paginationQuery: PaginationQueryDto): Promise<UserEntity[]> {
    return this.repository.findUsers(paginationQuery);
  }

  async findUserById(id: string) {
    const user = await this.repository.findUserById(id);

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async findUserByTelegramId(id: string) {
    const user = await this.repository.findUserByTelegramId(id);

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async findOneByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.repository.findUserByEmail(email);

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return user;
  }

  async updateUser(id: string, data: UserUpdateDto): Promise<UserEntity> {
    let hashedPassword = null;
    if (data.password) hashedPassword = await bcrypt.hash(data.password, 10);
    return this.repository.updateUser(id, {
      ...data,
      password: hashedPassword,
    });
  }

  async deleteUser(id: string, shopId: string): Promise<UserEntity> {
    const timestamp = new Date().getTime();
    const log: IRedisLog = {
      timestamp,
      msgType: MsgType.WARNING,
      message: `admin with id ${id} deleted`,
    };
    const redis_record_key = `${shopId}__anonymous__${new Date().getTime()}`;
    await this.redis.set(redis_record_key, log, ONE_WEEK_IN_SECOND);
    return this.repository.deleteUser(id);
  }

  async updatePassword(email: string, password: string) {
    const user = await this.findOneByEmail(email);
    return await this.updateUser(user.id, { password });
  }
}
