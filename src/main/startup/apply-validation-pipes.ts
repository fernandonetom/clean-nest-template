import { INestApplication, ValidationPipe } from '@nestjs/common';

export function applyValidationPipes(app: INestApplication) {
  app.useGlobalPipes(new ValidationPipe());
}
