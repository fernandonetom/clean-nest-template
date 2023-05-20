import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { union } from 'lodash';
import { NotFoundException } from '../../../../domain/@shared/exceptions/NotFoundException';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(404).json({
      statusCode: 404,
      error: 'NotFound',
      message: union(...Object.values(exception.getErrors())),
    });
  }
}
