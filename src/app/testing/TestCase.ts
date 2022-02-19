import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import fetchtest from 'fetchtest';
import { User } from '@prisma/client';
import { AuthService } from '../auth/auth.service';
import { AuthModule } from '../auth/auth.module';
import { ValidationPipeExtended } from '../shared/ValidationPipeExtended';

type FetchTest = ReturnType<typeof fetchtest>;

type HeaderPromiseClosure = () => Promise<Record<string, any>>;

export class TestCase {
  moduleRef: TestingModule;
  authService: AuthService;
  headerPromises: HeaderPromiseClosure[] = [];

  static make() {
    return new TestCase();
  }

  async createApplication() {
    this.moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
    const app = this.moduleRef.createNestApplication();

    this.authService = app.select(AuthModule).get(AuthService, { strict: true });
    app.useGlobalPipes(new ValidationPipeExtended({ transform: true }));

    await app.init();

    return app.getHttpServer();
  }

  actingAs(user: User) {
    this.headerPromises.push(() =>
      this.authService.login(user).then((result) => ({ Authorization: `Bearer ${result.access_token}` })),
    );
    return this;
  }

  async get(...[url, body, options = {}]: Parameters<FetchTest['get']>) {
    const application = await this.createApplication();
    const headers = await this.buildHeaders();

    options.headers = { ...(options?.headers ?? {}), ...headers };

    return fetchtest(application).get(url, body, options);
  }

  async post(...[url, body, options = {}]: Parameters<FetchTest['post']>) {
    const application = await this.createApplication();
    const headers = await this.buildHeaders();

    options.headers = { ...(options?.headers ?? {}), ...headers };

    return fetchtest(application).post(url, body, options);
  }

  async put(...[url, body, options = {}]: Parameters<FetchTest['put']>) {
    const application = await this.createApplication();
    const headers = await this.buildHeaders();

    options.headers = { ...(options?.headers ?? {}), ...headers };

    return fetchtest(application).put(url, body, options);
  }

  async patch(...[url, body, options = {}]: Parameters<FetchTest['patch']>) {
    const application = await this.createApplication();
    const headers = await this.buildHeaders();

    options.headers = { ...(options?.headers ?? {}), ...headers };

    return fetchtest(application).patch(url, body, options);
  }

  async delete(...[url, body, options = {}]: Parameters<FetchTest['delete']>) {
    const application = await this.createApplication();
    const headers = await this.buildHeaders();

    options.headers = { ...(options?.headers ?? {}), ...headers };

    return fetchtest(application).delete(url, body, options);
  }

  private async buildHeaders(): Promise<Record<string, any>> {
    let headers = {};
    for (const headerClosure of this.headerPromises) {
      headers = Object.assign(headers, await headerClosure());
    }
    return headers;
  }
}
