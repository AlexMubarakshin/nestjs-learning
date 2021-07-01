import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class SSOAuthGuard extends AuthGuard('sso') {}
