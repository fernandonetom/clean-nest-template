import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { Environment } from '../../environments';
import { UsersModule } from './users.module';
import { InfraModule } from './infra.module';

@Module({
  imports: [
    InfraModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: Environment.getEnvironmentPatch(),
    }),
  ],
})
export class AppModule {}
