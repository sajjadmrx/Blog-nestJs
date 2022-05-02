import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

(async () => {
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix("api/v1");

  const config = new DocumentBuilder()
    .setTitle('Blog - NestJS')
    .setDescription('The Blog API description')
    .setVersion('1.0')
    .addSecurity('jwt', {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      bearerFormat: 'Bearer '
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);


  await app.listen(port)
  console.log(`Server running on ${port}`)
})()