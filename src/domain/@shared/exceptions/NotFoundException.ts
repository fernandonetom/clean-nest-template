import { FieldError } from '../interfaces/IValidator';
import { BaseException } from './BaseException';

export class NotFoundException extends BaseException {
  constructor(errors: FieldError) {
    super('Not Found Error');
    this.name = 'NotFoundException';
    this.errors = errors;
  }
}
