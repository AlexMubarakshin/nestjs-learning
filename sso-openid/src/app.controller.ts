import {
  Controller,
  Get,
  Request,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { IsAuthorizedGuardGuard } from './common/is-authorized-guard.guard';
import { UnauthorizedExceptionFilter } from './common/unauthorized-exception.filter';
import { User } from './common/user.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test')
  @UseGuards(IsAuthorizedGuardGuard)
  getTest(@User() user): string {
    return user;
  }
}
