import 'source-map-support/register';

import { NestFactory, Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

import * as mongoose from 'mongoose';

import { AppModule } from './app.module';
import { MongoErrorFilter } from './common/mongo-error.filter';
import { JwtAuthGuard } from './auth/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  mongoose.set('debug', true);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new MongoErrorFilter());

  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector));

  const server = await app.listen(configService.get<number>('SERVER_PORT'));
  server.setTimeout(60 * 1000);
  server.keepAliveTimeout = 60 * 1000;
}

bootstrap();
