import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { flatMap } from 'rxjs/internal/operators';
@Injectable()
export class LoginInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    return from(
      new Promise<Error | void>((res, rej) =>
        req.logIn(req.user, (err) => (err ? rej(err) : res())),
      ),
    ).pipe(flatMap(() => next.handle()));
  }
}
