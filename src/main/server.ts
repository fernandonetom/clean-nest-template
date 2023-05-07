import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as chalk from 'chalk';
import { AppModule } from '../infrastructure/nestjs/ioc/app.module';
import { applyGlobalFilters } from './startup/apply-filters';
import { applyValidationPipes } from './startup/apply-validation-pipes';
import { swaggerConfig } from './startup/swagger-config';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, {
      cors: true,
    });

    const configService = app.get(ConfigService);

    applyGlobalFilters(app);
    applyValidationPipes(app);
    swaggerConfig(app);

    Logger.log(
      `Environment: ${chalk
        .hex('#87e8de')
        .bold(`${process.env.NODE_ENV?.toUpperCase()}`)}`,
      'Bootstrap',
    );

    const HOST = configService.get('HOST', 'localhost');
    const PORT = configService.get('PORT', '3000');

    await app.listen(PORT);
    process.env.NODE_ENV !== 'production'
      ? Logger.log(
          `🚀  Server ready at http://${HOST}:${chalk
            .hex('#87e8de')
            .bold(`${PORT}`)}`,
          'Bootstrap',
          false,
        )
      : Logger.log(
          `🚀  Server is listening on port ${chalk
            .hex('#87e8de')
            .bold(`${PORT}`)}`,
          'Bootstrap',
          false,
        );
  } catch (error) {
    Logger.error(`❌  Error starting server, ${error}`, '', 'Bootstrap', false);
    throw error;
  }
}

bootstrap();
