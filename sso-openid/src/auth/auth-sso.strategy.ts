import * as passport from 'passport';

import { Client, Strategy } from 'openid-client';

import { Inject, Injectable } from '@nestjs/common';
import { CLIENT } from './auth.constants';

@Injectable()
export class AuthSSOStrategy {
  constructor(@Inject(CLIENT) private readonly client: Client) {
    passport.serializeUser((user, done) => {
      done(null, user);
    });

    passport.deserializeUser((user, done) => {
      done(null, user);
    });

    passport.use(
      'sso',
      new Strategy({ client }, (tokenSet, userinfo, done) => {
        return done(null, userinfo);
      }),
    );
  }
}
