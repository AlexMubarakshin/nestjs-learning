import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Issuer, Strategy } from 'openid-client';
import * as passport from 'passport';

import { CLIENT, PASSPORT } from './auth.constants';

import { AuthController } from './auth.controller';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: CLIENT,
      useFactory: async (configService: ConfigService) => {
        const oneLoginIssuer = await Issuer.discover(
          configService.get<string>('AUTH_DISCOVER_URL'),
        );

        return new oneLoginIssuer.Client({
          client_id: configService.get<string>('CLIENT_ID'),
          client_secret: configService.get<string>('CLIENT_SECRET'),
          redirect_uris: [
            configService.get<string>('AUTH_REDIRECT_CALLBACK_URL'),
          ],
          response_types: ['code'],
        });
      },
      inject: [ConfigService],
    },
    {
      provide: PASSPORT,
      useFactory: (client) => {
        return passport.use(
          'sso',
          new Strategy({ client }, (tokenSet, userinfo, done) => {
            return done(null, userinfo);
          }),
        );
      },
      inject: [CLIENT],
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
