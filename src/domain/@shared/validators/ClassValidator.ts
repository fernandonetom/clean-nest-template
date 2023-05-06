import { FieldError, IValidator } from '../interfaces/IValidator';
import { validateSync } from 'class-validator';

export abstract class ClassValidator<TData extends object>
  implements IValidator<TData>
{
  errors: FieldError = null;

  validate(props: TData): boolean {
    const validationResult = validateSync(props);
    if (validationResult.length > 0) {
      this.errors = {};

      validationResult.forEach((error) => {
        this.errors[error.property] = Object.values(error.constraints).map(
          (value) => value,
        );
      });

      return false;
    }

    return true;
  }
}
