import { Module } from '@nestjs/common';
import { BCryptAdapter } from '../../adapters/encrypt/BCryptAdapter';
import { IEncryptAdapter } from '../../../application/interfaces/adapters/IEncryptAdapter';
import { IUsersRepository } from '../../../application/interfaces/repositories/IUsersRepository';
import { UsersRepositoryInMemory } from '../../database/inMemory/repositories/inMemory/UsersRepositoryInMemory';

@Module({
  providers: [
    {
      provide: IEncryptAdapter,
      useClass: BCryptAdapter,
    },
    { provide: IUsersRepository, useClass: UsersRepositoryInMemory },
  ],
  exports: [IEncryptAdapter, IUsersRepository],
})
export class InfraModule {}
