import { disconnect, resetDb } from '../testing/utils';
import { TestCase } from '../testing/TestCase';
import { HttpStatus } from '@nestjs/common';
import { UserFactory } from '../testing/factories/UserFactory';

beforeEach(() => resetDb());
afterAll(() => disconnect());

const test = TestCase.make();

describe('AuthController', () => {
  it('will login a user', async () => {
    const user = await UserFactory.create();

    const response = await test.post('/auth/login', { email: user.email, password: 'password' });
    expect(response.status).toEqual(HttpStatus.OK);
    expect(response.json.access_token).toEqual(expect.any(String));
  });

  it('will not login a user with wrong password', async () => {
    const user = await UserFactory.create();
    const response = await test.post('/auth/login', { email: user.email, password: `password123` });
    expect(response.status).toEqual(HttpStatus.UNAUTHORIZED);
  });
});
