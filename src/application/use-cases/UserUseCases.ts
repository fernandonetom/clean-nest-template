import { ConflictException } from '../../domain/@shared/exceptions/ConflictException';
import { NotFoundException } from '../../domain/@shared/exceptions/NotFoundException';
import { User } from '../../domain/entities/User';
import { UniqueId } from '../../domain/value-objects/UniqueId';
import { IUsersRepository } from '../interfaces/repositories/IUsersRepository';
import { IUseCase } from '../interfaces/use-cases/IUseCase';

export class UserUseCases implements IUseCase<User> {
  constructor(private readonly repository: IUsersRepository) {}

  findAll(): Promise<User[]> {
    return this.repository.findAll();
  }

  async create(entity: User): Promise<void> {
    const findUser = await this.repository.findByEmail(entity.email);
    if (findUser)
      throw new ConflictException({
        Email: ['Already in use'],
      });

    await this.repository.create(entity);
  }

  async update(entity: User): Promise<void> {
    await this.findById(entity.id);
    await this.repository.update(entity);
  }

  async findById(id: UniqueId): Promise<User> {
    const user = await this.repository.findById(id);
    if (!user)
      throw new NotFoundException({
        user: ['Not found'],
      });

    return user;
  }

  async remove(entity: User): Promise<void> {
    await this.findById(entity.id);
    await this.repository.remove(entity);
  }
}
