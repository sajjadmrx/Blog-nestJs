import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/modules/user/user.service';
import jwtConstant from '../constants/jwt.constant';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {


  constructor(
    private userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstant.secret
    })
  }

  async validate(payload: any) {
    const user = await this.userService.findOne(payload.userId);
    if (!user)
      throw new UnauthorizedException();

    return user;
  }

}