import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const configOpenAPI = (app: INestApplication): void => {
  const config = new DocumentBuilder()
    .setTitle('SnappFood API')
    .setDescription('SnappFood API to learn more')
    .setVersion('1.0')
    .setContact('Github', 'https://github.com/NimaCodez', 'nimacodes@gmail.com')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
};
