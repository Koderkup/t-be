import { Inject, Injectable } from '@nestjs/common';
import { ONE_WEEK_IN_SECOND } from '@root/constants/uploader.constant';
import {
  IRedisLog,
  IRedisUserActionLog,
  MsgType,
} from '@interfaces/redis-logs.interface';
import { RedisClient } from 'ioredis/built/connectors/SentinelConnector/types';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  public constructor(
    @Inject('REDIS_CLIENT')
    private readonly client: Redis,
  ) {}

  async set(
    key: string,
    value: object,
    expirationSeconds: number = ONE_WEEK_IN_SECOND,
  ) {
    const timestamp = new Date().getTime();
    await this.client.hmset(key, { ...value, timestamp });
    await this.client.expire(key, expirationSeconds);
  }

  async get(key: string): Promise<string[] | null> {
    return await this.client.hmget(key);
  }

  async del(key: string): Promise<number> {
    return await this.client.hdel(key);
  }

  async filterBy(
    filterObj: {
      shopId: string;
      customerId?: string;
    },
    isFilteringOnlyByShopId: boolean = false,
    isFilteringAction: boolean = false,
  ) {
    const keys = await this.client.keys(
      `${isFilteringAction ? 'action__' : ''}${filterObj.shopId}__${isFilteringOnlyByShopId ? '' : filterObj.customerId ? filterObj.customerId : ''}*`,
    );
    const filteredLogs = [];
    for (const key of keys) {
      const rec = await this.client.hgetall(key);
      filteredLogs.push(rec);
    }
    return filteredLogs;
  }

  async logUserAction(data: IRedisUserActionLog) {
    const timestamp = new Date().getTime();
    const key = `action__${data.shopId}__${data.customerId}__${new Date().getTime()}`;
    const log: IRedisLog = {
      msgType: MsgType.INFO,
      timestamp,
      message: `${data.link} is clicked`,
    };
    await this.set(key, log);
  }
}
