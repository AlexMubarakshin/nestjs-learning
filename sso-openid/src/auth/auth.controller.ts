import { Controller, Get, UseGuards, Session } from '@nestjs/common';
import { User } from 'src/common/user.decorator';
import { SSOAuthGuard } from './sso-guard.guard';

@Controller('auth')
export class AuthController {
  constructor() {}

  @Get('login')
  @UseGuards(SSOAuthGuard)
  login() {
    return;
  }

  @Get('callback')
  @UseGuards(SSOAuthGuard)
  async callback(@User() user, @Session() session: Record<string, any>) {
    session.user = user;
    return user;
  }
}
