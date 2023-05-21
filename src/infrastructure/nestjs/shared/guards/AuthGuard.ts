import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ITokenAdapter } from '../../../../application/interfaces/adapters/ITokenAdapter';
import { IS_PUBLIC_KEY } from '../decorators/IsPublicDecorator';
import { UnauthorizedException } from '../../../../domain/@shared/exceptions/UnauthorizedException';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private tokenAdapter: ITokenAdapter,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException({
        token: ["Token wasn't provided"],
      });
    }
    try {
      const payload = await this.tokenAdapter.verify(token);
      request['user'] = payload.user;
    } catch {
      throw new UnauthorizedException({
        token: ['Invalid token'],
      });
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
