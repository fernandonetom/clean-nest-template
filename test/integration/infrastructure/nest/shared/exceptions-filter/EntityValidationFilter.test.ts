import { Controller, Get, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { EntityValidationErrorFilter } from '../../../../../../src/infrastructure/nestjs/shared/exceptions-filter/EntityValidationFilter';
import { EntityValidationException } from '../../../../../../src/domain/@shared/exceptions/EntityValidationException';

@Controller('stub')
class StubController {
  @Get()
  index() {
    throw new EntityValidationException({
      field: ['error-one', 'error-two'],
    });
  }
}

describe('EntityValidationErrorFilter', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [StubController],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalFilters(new EntityValidationErrorFilter());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should catch a EntityValidationException', () => {
    return request(app.getHttpServer())
      .get('/stub')
      .expect(422)
      .expect({
        statusCode: 422,
        error: 'Unprocessable Entity',
        message: ['error-one', 'error-two'],
      });
  });
});
