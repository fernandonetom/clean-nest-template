import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { union } from 'lodash';
import { EntityValidationException } from '../../../../domain/@shared/exceptions/EntityValidationException';

@Catch(EntityValidationException)
export class EntityValidationErrorFilter implements ExceptionFilter {
  catch(exception: EntityValidationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(422).json({
      statusCode: 422,
      error: 'Unprocessable Entity',
      message: union(...Object.values(exception.getErrors())),
    });
  }
}
