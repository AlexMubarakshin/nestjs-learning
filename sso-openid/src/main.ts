import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import { AppModule } from './app.module';
import { UnauthorizedExceptionFilter } from './common/unauthorized-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      secret: 'secret',
      resave: false,
      saveUninitialized: true,
    }),
  );

  app.useGlobalFilters(new UnauthorizedExceptionFilter());

  await app.listen(3000);
}
bootstrap();
