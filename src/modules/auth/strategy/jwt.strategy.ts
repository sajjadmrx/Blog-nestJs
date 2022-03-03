import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from 'src/modules/user/user.repository';

import jwtConstant from '../constants/jwt.constant';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {


  constructor(
    private userRepository: UserRepository
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstant.secret
    })
  }

  async validate(payload: any) {
    const user = await this.userRepository.findById(payload.userId);
    if (!user)
      throw new UnauthorizedException();

    return user;
  }

}