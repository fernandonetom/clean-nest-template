import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ITokenInput } from '../../../../application/interfaces/adapters/ITokenAdapter';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): ITokenInput => {
    const request = context.switchToHttp().getRequest();

    return request.user;
  },
);
