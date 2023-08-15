import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersRepository } from "src/modules/users/users.repository";

import jwtConstant from "../constants/jwt.constant";
import { ConfigService } from "@nestjs/config";
import { Configs } from "../../../configuration";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(
    private userRepository: UsersRepository,
    private configService: ConfigService<Configs>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get("JWT_SECRET"),
    });
  }

  async validate(payload: any) {
    const user = await this.userRepository.findById(payload.userId);
    if (!user) throw new UnauthorizedException();

    return user;
  }
}
