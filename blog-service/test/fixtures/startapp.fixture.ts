import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../../src/app.module";
import { INestApplication, ValidationPipe } from "@nestjs/common";

export async function runAndGetAppFixture(): Promise<INestApplication> {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleFixture.createNestApplication();
  app.useGlobalPipes(new ValidationPipe());
  await app.init();
  return app;
}
