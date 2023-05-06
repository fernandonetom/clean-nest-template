import { FieldError } from '../interfaces/IValidator';
import { BaseException } from './BaseException';

export class ConflictException extends BaseException {
  constructor(errors: FieldError) {
    super('Conflict Error');
    this.name = 'ConflictException';
    this.errors = errors;
  }
}
