/// <reference types="webpack-env" />

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { OPTIONS } from './main.options';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, OPTIONS);
  app.listen(() => console.log('Database Microservice is listening with HMR enabled'));

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
