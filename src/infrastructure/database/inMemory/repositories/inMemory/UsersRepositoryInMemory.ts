import { IUsersRepository } from '../../../../../application/interfaces/repositories/IUsersRepository';
import { User } from '../../../../../domain/entities/User';
import { UniqueId } from '../../../../../domain/value-objects/UniqueId';

export class UsersRepositoryInMemory implements IUsersRepository {
  private readonly users: User[] = [];

  async findByEmail(email: string): Promise<User> {
    return this.users.find((item) => item.email === email);
  }
  async findAll(): Promise<User[]> {
    return this.users;
  }
  async create(entity: User): Promise<void> {
    this.users.push(entity);
  }
  async update(entity: User): Promise<void> {
    const findIndex = this.users.findIndex(
      (item) => item.id.value === entity.id.value,
    );

    this.users[findIndex] = entity;
  }
  async findById(id: UniqueId): Promise<User> {
    return this.users.find((item) => item.id === id);
  }
  async remove(entity: User): Promise<void> {
    const findIndex = this.users.findIndex(
      (item) => item.id.value === entity.id.value,
    );

    this.users.splice(findIndex, 1);
  }
}
