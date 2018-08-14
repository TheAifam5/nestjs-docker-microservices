import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { OPTIONS } from './main.options';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(ApplicationModule, OPTIONS);
  app.listen(() => console.log('Database Microservice is listening'));
}
bootstrap();
