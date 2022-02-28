import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import jwtConstant from '../constants/jwt.constant';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {


  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstant.secret
    })
  }

  async validate(payload: any) {
    throw new Error('Method not implemented.')
  }

}