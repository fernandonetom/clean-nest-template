import { Module } from '@nestjs/common';
import { AuthController } from '../../../presentation/controllers/AuthController';
import { SignInUseCase } from '../../../application/use-cases/SignInUseCase';
import { InfraModule } from './infra.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../shared/guards/AuthGuard';

@Module({
  imports: [InfraModule],
  controllers: [AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    SignInUseCase,
  ],
})
export class AuthModule {}
