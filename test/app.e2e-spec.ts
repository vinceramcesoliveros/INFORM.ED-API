import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { AccountsModule } from 'src/accounts/accounts.module';
import { utimes } from 'fs';

describe('AppController (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, AccountsModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
  it('/ (GET) ACCOUNTS', () => {
    return request(app.getHttpServer())
      .get('/accounts')
      .expect(200);
  });
  it('/ (POST) ACCOUNTS', () => {
    return request(app.getHttpServer())
      .post('/accounts')
      .send({
        firstName: 'Vince',
        middleName: 'Vicente',
        lastName: 'Oliveros',
        gender: 'male',
        role: 'admin',
      })
      .expect(201);
  });
});
