import { Module } from '@nestjs/common';
import { UserUseCases } from '../../../application/use-cases/UserUseCases';
import { UsersController } from '../../../presentation/controllers/UsersController';
import { InfraModule } from './infra.module';

@Module({
  imports: [InfraModule],
  controllers: [UsersController],
  providers: [UserUseCases],
})
export class UsersModule {}
