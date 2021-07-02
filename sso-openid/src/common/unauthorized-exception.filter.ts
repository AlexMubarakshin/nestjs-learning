import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  ForbiddenException,
} from '@nestjs/common';

@Catch()
export class UnauthorizedExceptionFilter<T> implements ExceptionFilter {
  catch(exception: ForbiddenException, host: ArgumentsHost) {
    host.switchToHttp().getResponse().redirect('/auth/login');
  }
}
