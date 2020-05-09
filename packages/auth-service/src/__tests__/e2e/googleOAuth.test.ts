import { GATEWAY_ENDPOINT } from './signup.test';
import request from 'graphql-request';

describe('Google OAuth', () => {
  let page;
  beforeAll(async () => {
    // Run "hostname -f" from bash/sh inside nginx docker container
    // that will give you the hostname of the docker container
    // that way you can use it here as the param.
    page = await browser.newPage();
    await page.goto('http://016e7da572d9/oauth/auth/google');

    const truncateUsersTableQuery = `
      mutation {
        deleteAllUsers
      }
    `;

    await request(GATEWAY_ENDPOINT, truncateUsersTableQuery);
  });

  afterAll(async () => {
    await page.close();
  });

  it('redirects user to route where they finish filling in necessary credentials to sign up', async () => {
    await expect(page.title()).resolves.toMatch(
      'Inicio de sesión - Cuentas de Google'
    );
  });
});
