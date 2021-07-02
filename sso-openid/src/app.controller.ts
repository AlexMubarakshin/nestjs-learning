import { Controller, Get, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './common/user.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test')
  getTest(@User() user): string {
    return user;
  }
}
