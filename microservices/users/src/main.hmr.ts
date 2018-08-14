/// <reference types="webpack-env" />

import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { OPTIONS } from './main.options';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.createMicroservice(ApplicationModule, OPTIONS);
  app.listen(() => console.log('Users Microservice is listening with HMR enabled'));

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
