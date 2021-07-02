import { Injectable, Scope } from '@nestjs/common';

@Injectable()
export class AuthService {
  async logIn(req) {
    await new Promise<Error | void>((res, rej) => {
      req.logIn(req.user, (err) => (err ? rej(err) : res()));
    });
  }
}
