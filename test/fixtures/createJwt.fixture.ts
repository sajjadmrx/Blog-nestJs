import { JwtService } from "@nestjs/jwt";
import { INestApplication } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Configs from "../../src/configuration";

export async function createJwtFixture(
  app: INestApplication,
  userId: number
): Promise<string> {
  const jwtService = app.get<JwtService>(JwtService);
  const config = app.get<ConfigService>(ConfigService);
  return jwtService.signAsync(
    { userId: userId },
    {
      expiresIn: "20d",
      secret: config.get("JWT_SECRET"),
    }
  );
}
