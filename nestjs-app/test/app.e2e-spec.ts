// import { Test, TestingModule } from '@nestjs/testing';
// import { INestApplication } from '@nestjs/common';
// import * as request from 'supertest';
// import { AppModule } from './../src/app.module';

// describe('AppController (e2e)', () => {
//   let app: INestApplication;

//   beforeEach(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [AppModule],
//     }).compile();

//     app = moduleFixture.createNestApplication();
//     await app.init();
//   });

//   it('/ (GET)', () => {
//     return request(app.getHttpServer())
//       .get('/')
//       .expect(200)
//       .expect('Hello World!');
//   });
// });
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import * as pactum from 'pactum';

const PORT = 3003;
describe('App EndToEnd tests', () => {
  let app: INestApplication;
  let prismaService: PrismaService;
  beforeAll(async () => {
    const appModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = appModule.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
    await app.listen(PORT);
    prismaService = app.get(PrismaService);
    await prismaService.cleanDatabase();
    pactum.request.setBaseUrl(`http://localhost:${PORT}`);
  });
  afterAll(() => {
    app.close();
  });
  it.todo('should PASS,keke 1');
  it.todo('should PASS,keke 2');
  describe('Test Authentication', () => {
    describe('Register', () => {
      it('should show error with empty email', () => {
        return (
          pactum
            .spec()
            // .post(`http://localhost:${PORT}/auth/register`)
            .post(`/auth/register`)
            .withBody({
              email: '',
              password: 'a123456',
            })
            .expectStatus(400)
        );
        // .inspect();
      });
      it('should show error with invalid email', () => {
        return (
          pactum
            .spec()
            // .post(`http://localhost:${PORT}/auth/register`)
            .post(`/auth/register`)
            .withBody({
              email: 'tuan@gmail',
              password: 'a123456',
            })
            .expectStatus(400)
        );
        // .inspect();
      });
      it('should show error with empty password', () => {
        return (
          pactum
            .spec()
            // .post(`http://localhost:${PORT}/auth/register`)
            .post(`/auth/register`)
            .withBody({
              email: 'tuan@gmail.com',
              password: '',
            })
            .expectStatus(400)
        );
        // .inspect();
      });
      it('should Register', () => {
        return (
          pactum
            .spec()
            // .post(`http://localhost:${PORT}/auth/register`)
            .post(`/auth/register`)
            .withBody({
              email: 'testemail01@gmail.com',
              password: 'a123456',
            })
            .expectStatus(201)
        );
        // .inspect();
      });
    });
    describe('Login', () => {
      it('should Login', () => {
        return (
          pactum
            .spec()
            .post(`/auth/login`)
            .withBody({
              email: 'testemail01@gmail.com',
              password: 'a123456',
            })
            .expectStatus(201)
            // .inspect()
            .stores('accessToken', 'accessToken')
        );
      });
    });
    describe('User', () => {
      describe('Get Detail User', () => {
        it('should get detail user', () => {
          return pactum
            .spec()
            .get('/users/me')
            .withHeaders({
              Authorization: 'Bearer $S{accessToken}',
            })
            .expectStatus(200)
            .stores('userId', 'id');
          // .inspect();
        });
      });
    });
    describe('Note', () => {
      describe('Insert Note', () => {
        it('insert first note', () => {
          return pactum
            .spec()
            .post('/notes')
            .withHeaders({
              Authorization: 'Bearer $S{accessToken}',
            })
            .withBody({
              title: 'This is title note 1',
              description: 'description',
              url: 'url',
            })
            .expectStatus(201)
            .stores('noteId01', 'id');
          // .inspect();
        });
        it('insert second note', () => {
          return pactum
            .spec()
            .post('/notes')
            .withHeaders({
              Authorization: 'Bearer $S{accessToken}',
            })
            .withBody({
              title: 'This is title note 2',
              description: 'description',
              url: 'url',
            })
            .expectStatus(201)
            .stores('noteId02', 'id');
          // .inspect();
        });
        it('get Note by id', () => {
          return pactum
            .spec()
            .get('/notes')
            .withHeaders({
              Authorization: 'Bearer $S{accessToken}',
            })
            .expectStatus(200)
            .withPathParams('id', '$S{noteId01}')
            .inspect();
        });
        it('get All Notes', () => {
          return pactum
            .spec()
            .get('/notes')
            .withHeaders({
              Authorization: 'Bearer $S{accessToken}',
            })
            .expectStatus(200)
            .inspect();
        });
        it('delete note by ID', () => {
          return pactum
            .spec()
            .delete('/notes')
            .withHeaders({
              Authorization: 'Bearer $S{accessToken}',
            })
            .withQueryParams('id', '$S{noteId02}')
            .expectStatus(204)
            .inspect();
        });
      });
    });
  });
});
