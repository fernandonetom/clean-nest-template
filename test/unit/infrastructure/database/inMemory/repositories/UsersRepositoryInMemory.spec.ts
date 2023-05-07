import { UsersRepositoryInMemory } from '../../../../../../src/infrastructure/database/inMemory/repositories/inMemory/UsersRepositoryInMemory';
import { UsersRepositoryInMemoryFixtures } from '../fixtures/UsersRepositoryInMemoryFixtures';

describe('UsersRepositoryInMemory', () => {
  let usersRepositoryInMemory: UsersRepositoryInMemory;
  let usersRepositoryInMemoryFixtures: UsersRepositoryInMemoryFixtures;

  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersRepositoryInMemoryFixtures = new UsersRepositoryInMemoryFixtures(
      usersRepositoryInMemory,
    );
  });
  it('should create an user and find by id', async () => {
    const user = await usersRepositoryInMemoryFixtures.GenerateAndSaveUser();

    const result = await usersRepositoryInMemory.findById(user.id);

    expect(result).toBeTruthy();
    expect(await result.toJson()).toStrictEqual(await user.toJson());
  });

  it('should find an user by email', async () => {
    const user = await usersRepositoryInMemoryFixtures.GenerateAndSaveUser();

    const result = await usersRepositoryInMemory.findByEmail(user.email);

    expect(result).toBeTruthy();
    expect(await result.toJson()).toStrictEqual(await user.toJson());
  });

  it('should find all users', async () => {
    const user1 = await usersRepositoryInMemoryFixtures.GenerateAndSaveUser();
    const user2 = await usersRepositoryInMemoryFixtures.GenerateAndSaveUser();

    const result = await usersRepositoryInMemory.findAll();

    expect(result.length).toBe(2);
    expect(await result[0].toJson()).toStrictEqual(await user1.toJson());
    expect(await result[1].toJson()).toStrictEqual(await user2.toJson());
  });

  it('should return 0 users when not found users', async () => {
    const result = await usersRepositoryInMemory.findAll();

    expect(result.length).toBe(0);
  });

  it('should update a correct user', async () => {
    const user1 = await usersRepositoryInMemoryFixtures.GenerateAndSaveUser();
    const user2 = await usersRepositoryInMemoryFixtures.GenerateAndSaveUser();
    user1.update({
      name: 'new name',
      email: 'new@email.com',
      password: 'new-strong-password',
    });
    await usersRepositoryInMemory.update(user1);

    const result = await usersRepositoryInMemory.findAll();

    expect(result.length).toBe(2);
    expect(await result[0].toJson()).toStrictEqual(await user1.toJson());
    expect(await result[1].toJson()).toStrictEqual(await user2.toJson());
    expect(result[0].updatedAt).toBeTruthy();
    expect(result[1].updatedAt).toBeFalsy();
  });

  it('should remove a correct user', async () => {
    const user1 = await usersRepositoryInMemoryFixtures.GenerateAndSaveUser();
    const user2 = await usersRepositoryInMemoryFixtures.GenerateAndSaveUser();

    await usersRepositoryInMemory.remove(user1);
    const result = await usersRepositoryInMemory.findAll();

    expect(await result[0].toJson()).toStrictEqual(await user2.toJson());
  });
});
