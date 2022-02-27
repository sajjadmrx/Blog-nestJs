import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';



(async () => {
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule)
  await app.listen(port)
})()