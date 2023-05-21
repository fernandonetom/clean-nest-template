import { FieldError } from '../interfaces/IValidator';

export class BaseException extends Error {
  protected errors: FieldError;

  constructor(message: string) {
    super(message);
  }

  getErrors(): FieldError {
    return this.errors ?? {};
  }
}
