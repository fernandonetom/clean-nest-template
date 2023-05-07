import { User } from '../../../../src/domain/entities/User';
import { CreateUserVM } from '../../../../src/presentation/view-models/users/CreateUserVM';

export class UsersVMFixtures {
  static GenerateCreateUserVm(user: User): CreateUserVM {
    const createUserVM = new CreateUserVM();
    createUserVM.name = user.name;
    createUserVM.email = user.email;
    createUserVM.password = 'strong-password#';

    return createUserVM;
  }
}
