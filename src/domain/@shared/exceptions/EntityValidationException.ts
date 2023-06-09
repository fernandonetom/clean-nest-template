import { FieldError } from '../interfaces/IValidator';
import { BaseException } from './BaseException';

export class EntityValidationException extends BaseException {
  constructor(errors: FieldError) {
    super('Entity Validation Error');
    this.name = 'EntityValidation';
    this.errors = errors;
  }
}
