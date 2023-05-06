export interface FieldError {
  [prop: string]: string[];
}

export interface IValidator<TData extends object> {
  errors: FieldError;
  validate(props: TData): boolean;
}
