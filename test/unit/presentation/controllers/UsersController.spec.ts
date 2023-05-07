import { MockProxy, mock } from 'jest-mock-extended';
import { UserUseCases } from '../../../../src/application/use-cases/UserUseCases';
import { UsersController } from '../../../../src/presentation/controllers/UsersController';
import { UserFixture } from '../../domain/fixtures/UserFixture';
import { UsersVMFixtures } from '../fixtures/UsersVMFixtures';
import { CreateUserVM } from '../../../../src/presentation/view-models/users/CreateUserVM';
import { UserVM } from '../../../../src/presentation/view-models/users/UserVM';
import { EntityValidationException } from '../../../../src/domain/@shared/exceptions/EntityValidationException';

describe('UsersController', () => {
  let usersController: UsersController;
  let userUseCases: MockProxy<UserUseCases>;

  beforeEach(() => {
    userUseCases = mock<UserUseCases>();
    usersController = new UsersController(userUseCases);
  });

  it('should create an user', async () => {
    const user = UserFixture.GenerateValidUser();
    const createUserVm = UsersVMFixtures.GenerateCreateUserVm(user);
    jest.spyOn(CreateUserVM, 'fromViewModel');
    userUseCases.create.mockResolvedValueOnce(user);

    const result = await usersController.createUser(createUserVm);

    expect(result).toBeTruthy();
    expect(result.id).toStrictEqual(expect.any(String));
    expect(result.name).toBe(createUserVm.name);
    expect(result.email).toBe(createUserVm.email);
    expect(result.createdAt).toBeTruthy();
    expect(result.updatedAt).toBeFalsy();
    expect(CreateUserVM.fromViewModel).toHaveBeenCalledWith(createUserVm);
  });

  it('should throw if create user use case throws', async () => {
    const exception = new EntityValidationException({
      field: ['any-error'],
    });
    const user = UserFixture.GenerateValidUser();
    const createUserVm = UsersVMFixtures.GenerateCreateUserVm(user);
    userUseCases.create.mockRejectedValueOnce(exception);

    await expect(usersController.createUser(createUserVm)).rejects.toThrowError(
      exception,
    );
  });
});
