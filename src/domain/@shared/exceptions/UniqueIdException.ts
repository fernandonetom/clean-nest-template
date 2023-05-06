import { FieldError } from '../interfaces/IValidator';
import { BaseException } from './BaseException';

export class UniqueIdException extends BaseException {
  constructor(errors: FieldError) {
    super('Unique ID Error');
    this.name = 'UniqueIdException';
    this.errors = errors;
  }
}
