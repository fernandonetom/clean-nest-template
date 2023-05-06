import UserValidatorFactory, { UserRules } from '../validators/UserValidator';
import { IUserPropsDto } from '../dtos/UserDto';
import { Entity } from '../@shared/entities/Entity';
import { EntityValidationException } from '../@shared/exceptions/EntityValidationException';

export class User extends Entity {
  private name: string;
  private email: string;
  private password: string;

  public get getName() {
    return this.name;
  }

  public get getEmail() {
    return this.email;
  }

  constructor({ name, email, password }: IUserPropsDto) {
    super();
    this.name = name;
    this.email = email;
    this.password = password;

    this.validate();
  }

  validate() {
    const validator = UserValidatorFactory.create();
    const isValid = validator.validate(
      new UserRules({
        name: this.name,
        email: this.email,
        password: this.password,
      }),
    );

    if (!isValid) {
      throw new EntityValidationException(validator.errors);
    }
  }
}
