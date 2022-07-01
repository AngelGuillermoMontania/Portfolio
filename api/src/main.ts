import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule /* , {
    logger: false
  } */,
  );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, //Transform all requests into dto
      whitelist: true, //Detect unnecessary past data
      forbidNonWhitelisted: true, //Returns a error with information about the data passed that is not necessary
    }),
  );

  await app.listen(3001);
}
bootstrap();
