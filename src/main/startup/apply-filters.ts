import { INestApplication } from '@nestjs/common';
import { EntityValidationErrorFilter } from '../../infrastructure/nestjs/shared/exceptions-filter/EntityValidationFilter';
import { ConflictExceptionFilter } from '../../infrastructure/nestjs/shared/exceptions-filter/ConflictFilter';
import { NotFoundExceptionFilter } from '../../infrastructure/nestjs/shared/exceptions-filter/NotFoundFilter';
import { UnauthorizedExceptionFilter } from '../../infrastructure/nestjs/shared/exceptions-filter/UnauthorizedFilter';

export function applyGlobalFilters(app: INestApplication) {
  app.useGlobalFilters(
    new EntityValidationErrorFilter(),
    new ConflictExceptionFilter(),
    new NotFoundExceptionFilter(),
    new UnauthorizedExceptionFilter(),
  );
}
