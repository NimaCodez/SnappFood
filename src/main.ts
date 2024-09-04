import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { configOpenAPI } from './config/openapi.config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  configOpenAPI(app);
  await app.listen(3000, () => {
    console.log(
      'App is running on http://localhost:3000',
      '\nAPI Docs: http://localhost:3000/api-docs',
    );
  });
}
bootstrap();
