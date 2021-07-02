import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as passport from 'passport';
import * as session from 'express-session';
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
  app.use(passport.initialize());
  app.use(passport.session());

  app.useGlobalFilters(new UnauthorizedExceptionFilter());

  await app.listen(3000);
}
bootstrap();
