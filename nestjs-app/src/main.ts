import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); //dung cho class-validator //phải dùng dto thì mới áp dụng đc validator
  await app.listen(3002);
}
bootstrap();
