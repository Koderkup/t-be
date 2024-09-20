import {
  Injectable,
  NestMiddleware,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '@modules/auth/auth.service';
import { RoutesEntities } from '@root/constants/routes-entities';
import { JwtPayload } from '@interfaces/jwt-payload.interface';
import { ONE_WEEK_IN_SECOND } from '@root/constants/uploader.constant';
import { RedisService } from '@modules/redis/redis.service';
import { IRedisLog, MsgType } from '@interfaces/redis-logs.interface';

@Injectable()
export class RedisLoggerMiddleware implements NestMiddleware {
  constructor(
    private readonly redis: RedisService,
    private readonly authService: AuthService,
  ) {}
  _tryToFind(req: Request) {
    return req.body.shopId ?? req.query.shopId ?? undefined;
  }
  async use(req: Request, res: Response, next: NextFunction) {
    if (!this._tryToFind(req)) {
      next();
      return;
    }
    //throw new NotFoundException(
    //  'Shop ID not found in the request body or in query parameters',
    //);
    //const result = await this.redis.get('key');
    let action = '';
    let actionItem = '';
    let payload: JwtPayload;
    let who = 'anonymous';
    let shopId: string = req.body.shopId ?? req.query.shopId;
    if (req.headers.authorization) {
      const { firstname, lastname } = await this.authService.getPayloadFromJWT(
        req.headers.authorization.split(' ')[1],
      );
      who = `${firstname} ${lastname}`;
    }

    switch (req.method) {
      case 'GET':
        action = 'get';
        break;
      case 'POST':
        action = 'create';
        break;
      case 'PATCH':
        action = 'change';
        break;
      case 'DELETE':
        action = 'delete';
        break;
      case 'PUT':
        action = 'change';
        break;
      default:
        break;
    }

    for (let url of Object.values(RoutesEntities)) {
      if (req.originalUrl.includes(url)) {
        actionItem = url;
        break;
      }
    }
    if (!req.url.includes('?limit')) {
      if (actionItem.endsWith('ies')) {
        actionItem = actionItem.replace(/ies$/, 'y');
      } else if (actionItem.endsWith('s')) {
        actionItem = actionItem.replace(/s$/, '');
      }
    }
    const timestamp = new Date().getTime();
    const redis_record_key = `${shopId}__${payload?.id ? payload?.id : 'anonymous'}__${timestamp}`;
    const log: IRedisLog = {
      message: `${who} ${action} ${actionItem}`,
      timestamp,
      msgType: MsgType.INFO,
    };
    await this.redis.set(redis_record_key, log, ONE_WEEK_IN_SECOND);
    next();
  }
}
