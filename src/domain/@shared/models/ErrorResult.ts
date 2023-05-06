import { Result } from './Result';

export class ErrorResult<TData> extends Result<TData> {
  constructor(errors: string[] = []) {
    super(false, null, errors);
  }
}
