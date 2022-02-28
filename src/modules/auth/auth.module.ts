import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "../user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import jwtConstant from "./constants/jwt.constant";
import { JwtStrategy } from "./strategy/jwt.strategy";

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstant.secret,
      signOptions: jwtConstant.signOptions,
    }),
    UserModule
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy
  ],
  exports: [
    JwtModule.register({
      secret: jwtConstant.secret,
      signOptions: jwtConstant.signOptions,
    }),
    AuthService,
    JwtStrategy
  ]
})
export class AuthModule { }