import { Module } from '@nestjs/common';
import { UserUseCases } from '../../../application/use-cases/UserUseCases';
import { UsersRepositoryInMemory } from '../../database/inMemory/repositories/inMemory/UsersRepositoryInMemory';
import { IUsersRepository } from '../../../application/interfaces/repositories/IUsersRepository';
import { UsersController } from '../../../presentation/controllers/UsersController';

@Module({
  controllers: [UsersController],
  providers: [
    UserUseCases,
    { provide: IUsersRepository, useClass: UsersRepositoryInMemory },
  ],
})
export class UsersModule {}
