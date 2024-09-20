import { JwtPayload } from '@interfaces/jwt-payload.interface';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload) {
    return {
      userId: payload.id,
      email: payload.email,
      role: payload.role,
      firstName: payload.firstname,
      lastname: payload.lastname,
      imageUrl: payload.imageUrl,
    };
  }
}
