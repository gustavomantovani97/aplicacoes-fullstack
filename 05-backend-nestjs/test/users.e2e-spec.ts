import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types.js';
import { AppModule } from '../src/app.module.js';
import { setupApp } from '../src/setup-app.js';

describe('/users (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    setupApp(app);
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('GET /users devolve a lista inicial', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect([
        { id: 1, name: 'Ana', email: 'ana@email.com' },
        { id: 2, name: 'Pedro', email: 'pedro@email.com' },
      ]);
  });

  it('POST /users cria o usuário e ele aparece no GET', async () => {
    await request(app.getHttpServer())
      .post('/users')
      .send({ name: '  Maria ', email: 'maria@email.com' })
      .expect(201)
      .expect({ id: 3, name: 'Maria', email: 'maria@email.com' });

    const response = await request(app.getHttpServer())
      .get('/users')
      .expect(200);
    expect(response.body).toHaveLength(3);
  });

  it.each([
    ['sem nome', { email: 'maria@email.com' }],
    ['nome só com espaços', { name: '   ', email: 'maria@email.com' }],
    ['e-mail inválido', { name: 'Maria', email: 'maria' }],
    ['campo extra', { name: 'Maria', email: 'maria@email.com', admin: true }],
  ])('POST /users responde 400 com %s', (_caso, body) => {
    return request(app.getHttpServer()).post('/users').send(body).expect(400);
  });

  it('POST /users explica o erro em português', async () => {
    const semEmail = await request(app.getHttpServer())
      .post('/users')
      .send({ name: 'Maria' })
      .expect(400);
    expect(semEmail.body.message).toEqual(['O e-mail é obrigatório']);

    const campoExtra = await request(app.getHttpServer())
      .post('/users')
      .send({ name: 'Maria', email: 'maria@email.com', admin: true })
      .expect(400);
    expect(campoExtra.body.message).toEqual(['O campo admin não é permitido']);
  });

  it('POST /users responde 409 com e-mail repetido', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({ name: 'Ana 2', email: 'ana@email.com' })
      .expect(409);
  });
});
