import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export function setupDocument(app: INestApplication, route: string) {
  const configDocument = new DocumentBuilder()
    .setTitle("Blog - NestJS")
    .setDescription("The Blog API description")
    .setVersion("1.0")
    .addBearerAuth({
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
    })
    .build();

  const document = SwaggerModule.createDocument(app, configDocument);
  SwaggerModule.setup(route, app, document);
}
