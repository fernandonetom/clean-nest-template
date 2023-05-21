import { SignInInputVM } from '../../../../src/presentation/view-models/auth/SignInInputVM';

export class AuthVMFixtures {
  static getSignInInputVM(): SignInInputVM {
    const vm = new SignInInputVM();

    vm.email = 'some-email@test.com';
    vm.password = 'some-strong-password';

    return vm;
  }
}
