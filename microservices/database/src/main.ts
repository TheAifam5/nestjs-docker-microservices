import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { OPTIONS } from './main.options';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, OPTIONS);
  app.listen(() => console.log('Database Microservice is listening'));
}
bootstrap();
