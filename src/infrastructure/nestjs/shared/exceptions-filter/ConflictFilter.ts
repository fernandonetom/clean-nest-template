import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { union } from 'lodash';
import { ConflictException } from '../../../../domain/@shared/exceptions/ConflictException';

@Catch(ConflictException)
export class ConflictExceptionFilter implements ExceptionFilter {
  catch(exception: ConflictException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(409).json({
      statusCode: 409,
      error: 'Conflict',
      message: union(...Object.values(exception.getErrors())),
    });
  }
}
