import { Module } from '@nestjs/common';
import { BCryptAdapter } from '../../adapters/encrypt/BCryptAdapter';
import { IEncryptAdapter } from '../../../application/interfaces/adapters/IEncryptAdapter';
import { IUsersRepository } from '../../../application/interfaces/repositories/IUsersRepository';
import { UsersRepositoryInMemory } from '../../database/inMemory/repositories/inMemory/UsersRepositoryInMemory';
import { JwtAdapter } from '../../adapters/jwt/JwtAdapter';
import { ITokenAdapter } from '../../../application/interfaces/adapters/ITokenAdapter';

@Module({
  providers: [
    {
      provide: IEncryptAdapter,
      useClass: BCryptAdapter,
    },
    {
      provide: ITokenAdapter,
      useClass: JwtAdapter,
    },
    { provide: IUsersRepository, useClass: UsersRepositoryInMemory },
  ],
  exports: [IEncryptAdapter, IUsersRepository, ITokenAdapter],
})
export class InfraModule {}
