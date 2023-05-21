import { Controller, Get, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { UnauthorizedException } from '../../../../../../src/domain/@shared/exceptions/UnauthorizedException';
import { UnauthorizedExceptionFilter } from '../../../../../../src/infrastructure/nestjs/shared/exceptions-filter/UnauthorizedFilter';

@Controller('stub')
class StubController {
  @Get()
  index() {
    throw new UnauthorizedException();
  }
}

describe('ConflictFilter', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [StubController],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalFilters(new UnauthorizedExceptionFilter());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should catch a UnauthorizedException', () => {
    return request(app.getHttpServer()).get('/stub').expect(401).expect({
      statusCode: 401,
      error: 'Unauthorized',
      message: [],
    });
  });
});
