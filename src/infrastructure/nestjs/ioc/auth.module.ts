import { Module } from '@nestjs/common';
import { AuthController } from '../../../presentation/controllers/AuthController';
import { SignInUseCase } from '../../../application/use-cases/SignInUseCase';
import { InfraModule } from './infra.module';

@Module({
  imports: [InfraModule],
  controllers: [AuthController],
  providers: [SignInUseCase],
})
export class AuthModule {}
