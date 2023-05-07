import { User } from '../../../../../../src/domain/entities/User';
import { UsersRepositoryInMemory } from '../../../../../../src/infrastructure/database/inMemory/repositories/inMemory/UsersRepositoryInMemory';
import { UserFixture } from '../../../../domain/fixtures/UserFixture';

export class UsersRepositoryInMemoryFixtures {
  constructor(private readonly repository: UsersRepositoryInMemory) {}

  async GenerateAndSaveUser(): Promise<User> {
    const user = UserFixture.GenerateValidUser();

    await this.repository.create(user);

    return user;
  }
}
