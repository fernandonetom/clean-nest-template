import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { Environment } from '../../environments';
import { UsersModule } from './users.module';
import { InfraModule } from './infra.module';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    InfraModule,
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: Environment.getEnvironmentPatch(),
    }),
  ],
})
export class AppModule {}
