import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../shared/decorators/is-public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  handleRequest(err, user) {
    return user;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const result = (await super.canActivate(context)) as boolean;

    if (isPublic) {
      return true;
    }

    const request = this.getRequest(context);

    if (!request.user) {
      throw new UnauthorizedException();
    }

    return result;
  }

  getRequest<T = any>(context: ExecutionContext): T {
    return context.switchToHttp().getRequest();
  }
}
