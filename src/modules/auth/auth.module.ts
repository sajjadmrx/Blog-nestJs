import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "../users/users.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategy/jwt.strategy";
const ImportsAndExports = [
  JwtModule.register({ signOptions: { expiresIn: "10d" } }),
];
@Module({
  imports: [...ImportsAndExports, UserModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [...ImportsAndExports, AuthService, JwtStrategy],
})
export class AuthModule {}
