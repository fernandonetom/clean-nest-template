export interface IResult<TData> {
  success: boolean;
  data?: TData;
  errors: string[];
}
