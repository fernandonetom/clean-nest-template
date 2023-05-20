import { Injectable } from '@nestjs/common';
import { ConflictException } from '../../domain/@shared/exceptions/ConflictException';
import { NotFoundException } from '../../domain/@shared/exceptions/NotFoundException';
import { User } from '../../domain/entities/User';
import { UniqueId } from '../../domain/value-objects/UniqueId';
import { IUsersRepository } from '../interfaces/repositories/IUsersRepository';
import { IUseCase } from '../interfaces/use-cases/IUseCase';
import { IUpdateUserDto } from '../dtos/UserDto';
import { IEncryptAdapter } from '../interfaces/adapters/IEncryptAdapter';

@Injectable()
export class UserUseCases implements IUseCase<User> {
  constructor(
    private readonly repository: IUsersRepository,
    private readonly encryptAdapter: IEncryptAdapter,
  ) {}

  list(): Promise<User[]> {
    return this.repository.findAll();
  }

  async create(entity: User): Promise<User> {
    const findUser = await this.repository.findByEmail(entity.email);

    if (findUser)
      throw new ConflictException({
        Email: ['Email already in use'],
      });

    const hashedPassword = await this.encryptAdapter.getHash(entity.password);

    entity.update({
      password: hashedPassword,
    });

    await this.repository.create(entity);

    return entity;
  }

  async update(data: IUpdateUserDto): Promise<void> {
    const user = await this.findById(data.id);

    if (data.password)
      data.password = await this.encryptAdapter.getHash(data.password);

    user.update({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    await this.repository.update(user);
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
