import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import type * as Passport from 'passport';

import { PASSPORT } from './auth.constants';

@Injectable()
export class SSOAuthGuard implements CanActivate {
  constructor(
    @Inject(PASSPORT) private readonly passport: Passport.Authenticator,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    request.user = await new Promise((resolve, reject) =>
      this.passport.authenticate('sso', (err, user) => {
        try {
          return resolve(this.handleRequest(err, user));
        } catch (err) {
          reject(err);
        }
      })(request, response),
    );

    return true;
  }

  private handleRequest(err, user) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
