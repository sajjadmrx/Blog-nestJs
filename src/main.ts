import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import { setupDocument } from "./document";
import { ConfigService } from "@nestjs/config";

(async () => {
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix("api/v1");
  app.useStaticAssets("uploads", {
    prefix: "/uploads/",
  });
  const configService: ConfigService = new ConfigService();
  if (configService.get<string>("APP_MODE").toUpperCase() == "DEVELOPMENT")
    setupDocument(app, "/api");
  await app.listen(port);
  console.log(`Server running on ${port}`);
})();
