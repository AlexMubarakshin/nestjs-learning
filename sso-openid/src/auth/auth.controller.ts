import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { User } from 'src/common/user.decorator';
import { AuthService } from './auth.service';
import { LoginInterceptor } from './login.interceptor';
import { SSOAuthGuard } from './sso-guard.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login')
  @UseGuards(SSOAuthGuard)
  login() {
    return;
  }

  @Get('callback')
  @UseGuards(SSOAuthGuard)
  @UseInterceptors(LoginInterceptor)
  async callback(@User() user) {
    return user;
  }
}
