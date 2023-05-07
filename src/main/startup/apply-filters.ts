import { INestApplication } from '@nestjs/common';
import { EntityValidationErrorFilter } from '../../infrastructure/nestjs/shared/exceptions-filter/EntityValidationFilter';
import { ConflictExceptionFilter } from '../../infrastructure/nestjs/shared/exceptions-filter/ConflictFilter';

export function applyGlobalFilters(app: INestApplication) {
  app.useGlobalFilters(
    new EntityValidationErrorFilter(),
    new ConflictExceptionFilter(),
  );
}
