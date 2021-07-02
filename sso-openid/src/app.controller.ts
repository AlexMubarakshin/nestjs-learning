import { Controller, Get, Session, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { IsAuthorizedGuardGuard } from './common/is-authorized-guard.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test')
  @UseGuards(IsAuthorizedGuardGuard)
  getTest(@Session() session: Record<string, any>): string {
    return session.user;
  }
}
