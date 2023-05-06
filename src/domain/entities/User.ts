import UserValidatorFactory, { UserRules } from '../validators/UserValidator';
import { IUserPropsDto, IUserUpdateProps } from '../dtos/UserDto';
import { Entity } from '../@shared/entities/Entity';
import { EntityValidationException } from '../@shared/exceptions/EntityValidationException';

export class User extends Entity {
  private _name: string;
  private _email: string;
  private _password: string;

  public get name() {
    return this._name;
  }

  public get email() {
    return this._email;
  }

  constructor({
    id,
    name,
    email,
    password,
    createdAt,
    updatedAt,
  }: IUserPropsDto) {
    super({ id, createdAt, updatedAt });
    this._name = name;
    this._email = email;
    this._password = password;

    this.validate();
  }

  update(props: IUserUpdateProps) {
    Object.assign(this, {
      ...(props.name && { _name: props.name }),
      ...(props.email && { _email: props.email }),
      ...(props.password && { _password: props.password }),
    });

    this.updatedAt = new Date();

    this.validate();
  }

  validate() {
    const validator = UserValidatorFactory.create();
    const isValid = validator.validate(
      new UserRules({
        name: this._name,
        email: this._email,
        password: this._password,
      }),
    );

    if (!isValid) {
      throw new EntityValidationException(validator.errors);
    }
  }
}
