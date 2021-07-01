import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { SSOAuthGuard } from './sso-guard.guard';

@Controller('auth')
export class AuthController {
  @Get('login')
  @UseGuards(SSOAuthGuard)
  login() {
    return;
  }

  @Get('callback')
  @UseGuards(SSOAuthGuard)
  async callback(@Request() req: Record<string, any>) {
    await new Promise<Error | void>((res, rej) => {
      req.logIn(req.user, (err) => (err ? rej(err) : res()));
    });
    console.log('USER > ', req.user);
    return req.user;
  }
}
