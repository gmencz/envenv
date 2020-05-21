import request from 'graphql-request';
import getSession from '../../helpers/getSession';
import redisClient from '../../helpers/redisClient';
import { LoginResult, SuccessfulLogin } from '../../graphql/generated';
import { isValid } from 'shortid';

describe('Login', () => {
  beforeAll(async () => {
    const truncateUsersTableQuery = `
      mutation {
        deleteAllUsers {
          __typename
        }
      }
    `;

    await request(process.env.GRAPHQL_ENDPOINT!, truncateUsersTableQuery);

    const signupMutation = `
      mutation {
        signup(data: {
          username: "mock",
          email: "mock@mock.com",
          name: "Mock",
          password: "mockpw123"
        }) {
          __typename
        }
      }
    `;

    await request(process.env.GRAPHQL_ENDPOINT!, signupMutation);
  });

  it('logs user in if credentials are valid and creates a valid and secure session', async () => {
    const loginMutation = `
      mutation {
        login(username: "mock", password: "mockpw123") {
          __typename
          ... on SuccessfulLogin {
            user {
              username
            }
            csrfToken
          }
        }
      }
    `;

    const loginResponse: { login: LoginResult } = await request(
      process.env.GRAPHQL_ENDPOINT!,
      loginMutation
    );

    expect(loginResponse.login.__typename).toBe('SuccessfulLogin');

    const { user, csrfToken } = loginResponse.login as SuccessfulLogin;
    expect(user.username).toBe('@mock');
    expect(isValid(csrfToken)).toBe(true);

    const redisKeys: string[] = await new Promise((res, rej) => {
      redisClient.keys('*', (err, keys) => {
        if (err) {
          rej(err);
        }

        res(keys);
      });
    });

    const validSessionWasCreated = redisKeys.some(async redisKey => {
      const session = await getSession(redisKey.split('_')[1], redisClient);

      if (session?.userId === user.id && session?.csrfToken === csrfToken) {
        return true;
      }

      return false;
    });

    expect(validSessionWasCreated).toBe(true);
  });

  it('informs client via custom `error type` if username/password do not meet security requirements', async () => {
    const loginMutation = `
      mutation {
        login(username: "m", password: "mockPassword") {
          __typename
        }
      }
    `;

    const response: { login: LoginResult } = await request(
      process.env.GRAPHQL_ENDPOINT!,
      loginMutation
    );
    expect(response.login.__typename).toBe('InvalidDataFormat');

    const loginMutation2 = `
      mutation {
        login(username: "mockUsername", password: "123") {
          __typename
        }
      }
    `;

    const secondResponse: { login: LoginResult } = await request(
      process.env.GRAPHQL_ENDPOINT!,
      loginMutation2
    );
    expect(secondResponse.login.__typename).toBe('InvalidDataFormat');
  });

  it(' informs client via custom `error type` if credentials are invalid', async () => {
    const loginMutation = `
      mutation {
        login(username: "invalidUsername", password: "mockPassword") {
          __typename
        }
      }
    `;

    const response: { login: LoginResult } = await request(
      process.env.GRAPHQL_ENDPOINT!,
      loginMutation
    );
    expect(response.login.__typename).toBe('InvalidCredentials');
  });
});
