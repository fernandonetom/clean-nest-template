import { Controller, Get, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { NotFoundException } from '../../../../../../src/domain/@shared/exceptions/NotFoundException';
import { NotFoundExceptionFilter } from '../../../../../../src/infrastructure/nestjs/shared/exceptions-filter/NotFoundFilter';

@Controller('stub')
class StubController {
  @Get()
  index() {
    throw new NotFoundException({
      field: ['error-one', 'error-two'],
    });
  }
}

describe('NotFound', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [StubController],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalFilters(new NotFoundExceptionFilter());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should catch a NotFoundException', () => {
    return request(app.getHttpServer())
      .get('/stub')
      .expect(404)
      .expect({
        statusCode: 404,
        error: 'NotFound',
        message: ['error-one', 'error-two'],
      });
  });
});
