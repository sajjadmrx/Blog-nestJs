import { ConfigService } from "@nestjs/config";
import { Configs } from "../../../configuration";

const jwtConstant = {
  getSecret: (configService: ConfigService<Configs>): string =>
    configService.get<string>("JWT_SECRET"),
  signOptions: {
    expiresIn: "1d",
  },
};

export default jwtConstant;
