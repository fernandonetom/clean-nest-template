import { MockProxy, mock } from 'jest-mock-extended';
import { SignInUseCase } from '../../../../src/application/use-cases/SignInUseCase';
import { IUsersRepository } from '../../../../src/application/interfaces/repositories/IUsersRepository';
import { IEncryptAdapter } from '../../../../src/application/interfaces/adapters/IEncryptAdapter';
import { ITokenAdapter } from '../../../../src/application/interfaces/adapters/ITokenAdapter';
import { UserFixture } from '../../domain/fixtures/UserFixture';
import { User } from '../../../../src/domain/entities/User';

describe('SignInUseCase', () => {
  let signInUseCase: SignInUseCase;
  let usersRepository: MockProxy<IUsersRepository>;
  let encryptAdapter: MockProxy<IEncryptAdapter>;
  let tokenAdapter: MockProxy<ITokenAdapter>;
  let user: User;

  beforeEach(() => {
    usersRepository = mock<IUsersRepository>();
    encryptAdapter = mock<IEncryptAdapter>();
    tokenAdapter = mock<ITokenAdapter>();
    signInUseCase = new SignInUseCase(
      usersRepository,
      encryptAdapter,
      tokenAdapter,
    );

    user = UserFixture.GenerateValidUser();
  });
  it('should signIn an user', async () => {
    const fakeToken = {
      token: 'any-token',
      expiresAt: Date.now(),
    };
    usersRepository.findByEmail.mockResolvedValue(user);
    encryptAdapter.compareHash.mockResolvedValue(true);
    tokenAdapter.sing.mockResolvedValue(fakeToken);

    const act = await signInUseCase.execute({
      email: user.email,
      password: 'plain-password',
    });

    expect(act).toStrictEqual(fakeToken);
    expect(usersRepository.findByEmail).toHaveBeenCalledWith(user.email);
    expect(encryptAdapter.compareHash).toHaveBeenCalledWith(
      'plain-password',
      user.password,
    );
    expect(tokenAdapter.sing).toHaveBeenCalledWith({
      user: {
        id: user.id.value,
        email: user.email,
      },
    });
  });
});
