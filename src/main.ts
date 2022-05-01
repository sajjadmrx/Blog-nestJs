import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';



(async () => {
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port)
  console.log(`Server running on ${port}`)
})()