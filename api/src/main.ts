import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NextFunction, Request, Response } from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    allowedHeaders:"*",
    origin: "*"
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, //Transform all requests into dto
      whitelist: true, //Detect unnecessary past data
      forbidNonWhitelisted: true, //Returns a error with information about the data passed that is not necessary
    }),
  );

  await app.listen(process.env.PORT || 3001);
}
bootstrap();
