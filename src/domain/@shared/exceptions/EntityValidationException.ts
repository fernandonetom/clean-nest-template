import { FieldError } from '../interfaces/IValidator';

export class EntityValidationException {
  errors: FieldError;

  constructor(errors: FieldError) {
    this.errors = errors;
  }
}
