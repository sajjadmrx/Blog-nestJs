import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

(async () => {
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix("api/v1");
  app.useStaticAssets('uploads', {
    prefix: '/uploads/'
  })
  const config = new DocumentBuilder()
    .setTitle('Blog - NestJS')
    .setDescription('The Blog API description')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT'
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  //public to upload filder
  await app.listen(port)
  console.log(`Server running on ${port}`)
})()