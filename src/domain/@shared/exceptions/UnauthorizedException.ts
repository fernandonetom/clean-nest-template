import { FieldError } from '../interfaces/IValidator';
import { BaseException } from './BaseException';

export class UnauthorizedException extends BaseException {
  constructor(errors?: FieldError) {
    super('Unauthorized Error');
    this.name = 'UnauthorizedException';
    this.errors = errors;
  }
}
