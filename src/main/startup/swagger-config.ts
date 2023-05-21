import { Logger } from '@nestjs/common';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function swaggerConfig(app: INestApplication) {
  const configService = app.get(ConfigService);
  console.log(process.env);
  const APP_NAME = configService.get('APP_NAME');
  const APP_DESCRIPTION = configService.get('APP_DESCRIPTION');
  const API_VERSION = configService.get('API_VERSION', 'v1');
  const options = new DocumentBuilder()
    .setTitle(APP_NAME)
    .setDescription(APP_DESCRIPTION)
    .setVersion(API_VERSION)
    .addSecurity('bearer', {
      type: 'http',
      scheme: 'bearer',
    })
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  SwaggerModule.setup('/', app, document);

  Logger.log('Mapped {/, GET} Swagger api route', 'RouterExplorer');
  Logger.log('Mapped {/api, GET} Swagger api route', 'RouterExplorer');
}
