import { UserUseCases } from '../../../../src/application/use-cases/UserUseCases';
import { MockProxy, mock } from 'jest-mock-extended';
import { UserFixture } from '../../domain/fixtures/UserFixture';
import { IUsersRepository } from '../../../../src/application/interfaces/repositories/IUsersRepository';

describe('UserUseCases', () => {
  let userUseCases: UserUseCases;
  let usersRepository: MockProxy<IUsersRepository>;

  beforeEach(() => {
    usersRepository = mock<IUsersRepository>();
    userUseCases = new UserUseCases(usersRepository);
  });
  it('should create a new user', async () => {
    const user = UserFixture.GenerateValidUser();

    const result = await userUseCases.create(user);

    expect(result.success).toBeTruthy();
    expect(usersRepository.create).toHaveBeenCalledWith(user);
  });

  it('should now create an user when their email is in use', async () => {
    const user = UserFixture.GenerateValidUser();
    usersRepository.findByEmail.mockResolvedValue(user);

    const result = await userUseCases.create(user);

    expect(result.success).toBeFalsy();
    expect(result.errors.length).toBe(1);
    expect(result.errors[0]).toBe('Email already in use');
    expect(usersRepository.findByEmail).toHaveBeenCalledWith(user.email);
  });
});
