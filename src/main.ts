import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { configOpenAPI } from './config/openapi.config';
import { ValidationPipe } from '@nestjs/common';
import { validateENVVariables } from './common/utils/check-envs-existence';
import { ENV_VARS } from './common/envs/env-vars';

async function bootstrap() {
  validateENVVariables();
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  configOpenAPI(app);
  await app.listen(ENV_VARS.PORT);
}
bootstrap()
  .then(() => {
    console.log('SUCCESSFULLY STARTED THE SERVER');
  })
  .then(() => {
    console.log(
      'App is running on http://localhost:3000',
      '\nAPI Docs: http://localhost:3000/api-docs',
    );
  })
  .catch(err => {
    console.error(err);
  });
