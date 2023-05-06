import { ErrorResult } from '../../domain/@shared/models/ErrorResult';
import { Result } from '../../domain/@shared/models/Result';
import { SuccessResult } from '../../domain/@shared/models/SuccessResult';
import { User } from '../../domain/entities/User';
import { UniqueId } from '../../domain/value-objects/UniqueId';
import { IUsersRepository } from '../interfaces/repositories/IUsersRepository';
import { IUseCase } from '../interfaces/use-cases/IUseCase';

export class UserUseCases implements IUseCase<User> {
  constructor(private readonly repository: IUsersRepository) {}
  findAll(): Promise<Result<User[]>> {
    throw new Error('Method not implemented.');
  }
  async create(entity: User): Promise<Result<void>> {
    const findUser = await this.repository.findByEmail(entity.email);
    if (findUser) return new ErrorResult(['Email already in use']);

    await this.repository.create(entity);

    return new SuccessResult();
  }
  update(entity: User): Promise<Result<void>> {
    throw new Error('Method not implemented.');
  }
  findById(id: UniqueId): Promise<Result<User>> {
    throw new Error('Method not implemented.');
  }
  remove(entity: User): Promise<Result<void>> {
    throw new Error('Method not implemented.');
  }
}
