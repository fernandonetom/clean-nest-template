import { Result } from './Result';

export class SuccessResult<TData> extends Result<TData> {
  constructor(data?: TData) {
    super(true, data);
  }
}
