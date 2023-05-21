import { MockProxy, mock } from 'jest-mock-extended';
import { SignInUseCase } from '../../../../src/application/use-cases/SignInUseCase';
import { AuthController } from '../../../../src/presentation/controllers/AuthController';
import { AuthVMFixtures } from '../fixtures/AuthVMFixtures';
import { SignInOutputVM } from '../../../../src/presentation/view-models/auth/SignInOutputVM';
import { SignInInputVM } from '../../../../src/presentation/view-models/auth/SignInInputVM';
import { UnauthorizedException } from '../../../../src/domain/@shared/exceptions/UnauthorizedException';

describe('AuthController', () => {
  let authController: AuthController;
  let signInUseCase: MockProxy<SignInUseCase>;

  beforeEach(() => {
    signInUseCase = mock<SignInUseCase>();
    authController = new AuthController(signInUseCase);
  });
  it('should create a new token', async () => {
    signInUseCase.execute.mockResolvedValueOnce({
      token: 'any-token',
      expiresAt: 1234,
    });
    jest.spyOn(SignInInputVM, 'fromViewModel');
    jest.spyOn(SignInOutputVM, 'toViewModel');
    const signInInputVm = AuthVMFixtures.getSignInInputVM();

    const act = await authController.login(signInInputVm);

    expect(act.token).toBe('any-token');
    expect(act.expiresAt).toBe(1234);
    expect(SignInInputVM.fromViewModel).toHaveBeenCalledWith(signInInputVm);
    expect(SignInOutputVM.toViewModel).toHaveBeenCalledWith({
      token: 'any-token',
      expiresAt: 1234,
    });
  });

  it('should throw if signIn use case throws', async () => {
    const exception = new UnauthorizedException();
    signInUseCase.execute.mockRejectedValueOnce(exception);
    const signInInputVm = AuthVMFixtures.getSignInInputVM();

    const act = authController.login(signInInputVm);

    await expect(act).rejects.toThrowError(exception);
  });
});
