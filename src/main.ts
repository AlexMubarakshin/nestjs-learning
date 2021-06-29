import 'source-map-support/register';

import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import * as mongoose from 'mongoose';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  mongoose.set('debug', true);

  const server = await app.listen(configService.get<number>('SERVER_PORT'));
  server.setTimeout(60 * 1000);
  server.keepAliveTimeout = 60 * 1000;
}

bootstrap();
