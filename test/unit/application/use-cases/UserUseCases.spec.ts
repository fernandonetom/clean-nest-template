import { UserUseCases } from '../../../../src/application/use-cases/UserUseCases';
import { MockProxy, mock } from 'jest-mock-extended';
import { UserFixture } from '../../domain/fixtures/UserFixture';
import { IUsersRepository } from '../../../../src/application/interfaces/repositories/IUsersRepository';
import { ConflictException } from '../../../../src/domain/@shared/exceptions/ConflictException';
import { NotFoundException } from '../../../../src/domain/@shared/exceptions/NotFoundException';
import { IEncryptAdapter } from '../../../../src/application/interfaces/adapters/IEncryptAdapter';

describe('UserUseCases', () => {
  let userUseCases: UserUseCases;
  let usersRepository: MockProxy<IUsersRepository>;
  let encryptAdapter: MockProxy<IEncryptAdapter>;

  beforeEach(() => {
    usersRepository = mock<IUsersRepository>();
    encryptAdapter = mock<IEncryptAdapter>();
    userUseCases = new UserUseCases(usersRepository, encryptAdapter);
  });
  it('should create a new user', async () => {
    const user = UserFixture.GenerateValidUser();

    await userUseCases.create(user);

    expect(usersRepository.create).toHaveBeenCalledWith(user);
    expect(encryptAdapter.getHash).toHaveBeenCalledWith(user.password);
  });

  it('should not create an user when their email is in use', async () => {
    const user = UserFixture.GenerateValidUser();
    usersRepository.findByEmail.mockResolvedValue(user);

    const act = userUseCases.create(user);

    await expect(act).rejects.toThrowError(
      new ConflictException({
        Email: ['Email already in use'],
      }),
    );
    expect(usersRepository.findByEmail).toHaveBeenCalledWith(user.email);
  });

  it('should update an user', async () => {
    const user = UserFixture.GenerateValidUser();
    usersRepository.findById.mockResolvedValue(user);

    await userUseCases.update({
      id: user.id,
      email: user.email,
      password: user.password,
      name: user.name,
    });

    expect(usersRepository.findById).toHaveBeenCalledWith(user.id);
    expect(usersRepository.update).toHaveBeenCalledWith(user);
    expect(encryptAdapter.getHash).toHaveBeenCalledWith(user.password);
  });

  it('should update an user without change password', async () => {
    const user = UserFixture.GenerateValidUser();
    usersRepository.findById.mockResolvedValue(user);

    await userUseCases.update({
      id: user.id,
      email: user.email,
      password: undefined,
      name: user.name,
    });

    expect(usersRepository.findById).toHaveBeenCalledWith(user.id);
    expect(usersRepository.update).toHaveBeenCalledWith(user);
    expect(encryptAdapter.getHash).not.toHaveBeenCalled();
  });

  it("should not update an user if user doesn't exists", async () => {
    const user = UserFixture.GenerateValidUser();
    usersRepository.findById.mockResolvedValue(null);

    const act = userUseCases.update(user);

    await expect(act).rejects.toThrowError(
      new NotFoundException({
        user: ['Not found'],
      }),
    );
    expect(usersRepository.update).not.toHaveBeenCalled();
  });

  it('should return an user when find by id', async () => {
    const user = UserFixture.GenerateValidUser();
    usersRepository.findById.mockResolvedValue(user);

    const result = await userUseCases.findById(user.id);

    expect(result.id).toBe(user.id);
    expect(result.name).toBe(user.name);
    expect(result.email).toBe(user.email);
    expect(result.createdAt).toBe(user.createdAt);
    expect(result.updatedAt).toBe(user.updatedAt);
    expect(usersRepository.findById).toHaveBeenCalledWith(user.id);
  });

  it("should throws NotFoundException if user doesn't exists", async () => {
    const user = UserFixture.GenerateValidUser();
    usersRepository.findById.mockResolvedValue(null);

    const act = userUseCases.findById(user.id);

    await expect(act).rejects.toThrowError(
      new NotFoundException({
        user: ['Not found'],
      }),
    );
  });

  it('should remove an user', async () => {
    const user = UserFixture.GenerateValidUser();
    usersRepository.findById.mockResolvedValue(user);

    await userUseCases.remove(user);

    expect(usersRepository.findById).toHaveBeenCalledWith(user.id);
    expect(usersRepository.remove).toHaveBeenCalledWith(user);
  });

  it("should not remove an user if user doesn't exists", async () => {
    const user = UserFixture.GenerateValidUser();
    usersRepository.findById.mockResolvedValue(null);

    const act = userUseCases.remove(user);

    await expect(act).rejects.toThrowError(
      new NotFoundException({
        user: ['Not found'],
      }),
    );
    expect(usersRepository.remove).not.toHaveBeenCalled();
  });

  it('should list all users', async () => {
    const user1 = UserFixture.GenerateValidUser();
    const user2 = UserFixture.GenerateValidUser();
    usersRepository.findAll.mockResolvedValue([user1, user2]);

    const result = await userUseCases.list();

    expect(result).toEqual([user1, user2]);
    expect(usersRepository.findAll).toHaveBeenCalled();
  });
});
