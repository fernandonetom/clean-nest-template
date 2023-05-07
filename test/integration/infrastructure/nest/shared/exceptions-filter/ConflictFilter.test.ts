import { Controller, Get, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { ConflictException } from '../../../../../../src/domain/@shared/exceptions/ConflictException';
import { ConflictExceptionFilter } from '../../../../../../src/infrastructure/nestjs/shared/exceptions-filter/ConflictFilter';

@Controller('stub')
class StubController {
  @Get()
  index() {
    throw new ConflictException({
      field: ['error-one', 'error-two'],
    });
  }
}

describe('ConflictFilter', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [StubController],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalFilters(new ConflictExceptionFilter());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should catch a ConflictException', () => {
    return request(app.getHttpServer())
      .get('/stub')
      .expect(409)
      .expect({
        statusCode: 409,
        error: 'Conflict',
        message: ['error-one', 'error-two'],
      });
  });
});
