import { Module } from '@nestjs/common';
import { AuthSSOStrategy } from './auth-sso.strategy';
import { CLIENT } from './auth.constants';
import { Issuer } from 'openid-client';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';

@Module({
  imports: [ConfigModule],
  providers: [
    AuthSSOStrategy,
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
    AuthService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
