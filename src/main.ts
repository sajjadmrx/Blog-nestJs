import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import { setupDocument } from "./document";
import { ConfigService } from "@nestjs/config";
import { Configs } from "./configuration";

(async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix("api/v1");

  app.useStaticAssets("uploads", {
    prefix: "/uploads/",
  });

  const configService: ConfigService<Configs> = new ConfigService();

  const port = configService.get<number>("PORT") || 3000;

  const isDevelopmentMode: boolean =
    configService.get<string>("APP_MODE").toUpperCase() == "DEVELOPMENT";

  const DOCUMENT_ROUTE: string = "/api";

  if (isDevelopmentMode) setupDocument(app, DOCUMENT_ROUTE);

  await app.listen(port);

  console.log(`Server running on ${port}`);

  const appUrl: string = isDevelopmentMode
    ? `http://127.0.0.1:${port}`
    : await app.getUrl();

  console.log(`GraphQl: ${appUrl}/graphql`);

  isDevelopmentMode &&
    console.log(`RestApi: http://localhost:${port}${DOCUMENT_ROUTE}`);
})();
