import { User } from '../../../../src/domain/entities/User';
import { CreateUserVM } from '../../../../src/presentation/view-models/users/CreateUserVM';
import { UpdateUserVM } from '../../../../src/presentation/view-models/users/UpdateUserVM';

export class UsersVMFixtures {
  static GenerateCreateUserVm(user: User): CreateUserVM {
    const createUserVM = new CreateUserVM();
    createUserVM.name = user.name;
    createUserVM.email = user.email;
    createUserVM.password = 'strong-password#';

    return createUserVM;
  }

  static GenerateUpdateUserVm(user: User): UpdateUserVM {
    const updateUserVM = new UpdateUserVM();
    updateUserVM.name = user.name;
    updateUserVM.email = user.email;
    updateUserVM.password = 'strong-password#';

    return updateUserVM;
  }
}
