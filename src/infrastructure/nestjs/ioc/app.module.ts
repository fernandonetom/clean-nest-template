import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { Environment } from '../../environments';
import { UsersModule } from './users.module';
import { InfraModule } from './infra.module';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: Environment.getEnvironmentPatch(),
    }),
    InfraModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
