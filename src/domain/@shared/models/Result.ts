import { IResult } from '../interfaces/IResult';

export abstract class Result<TData> implements IResult<TData> {
  success: boolean;
  data?: TData;
  errors: string[];

  constructor(success: boolean, data?: TData, errors: string[] = []) {
    this.success = success;
    this.data = data;
    this.errors = errors;
  }
}
