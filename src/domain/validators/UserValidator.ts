import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { IUserPropsDto } from '../dtos/UserDto';
import { ClassValidator } from '../@shared/validators/ClassValidator';
import { EntityRules } from '../@shared/validators/EntityValidator';

export class UserRules extends EntityRules {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password: string;

  constructor(props: IUserPropsDto) {
    super(props);
    Object.assign(this, props);
  }
}

export class UserValidator extends ClassValidator<UserRules> {
  validate(props: UserRules): boolean {
    return super.validate(props);
  }
}

export class UserValidatorFactory {
  static create() {
    return new UserValidator();
  }
}

export default UserValidatorFactory;
