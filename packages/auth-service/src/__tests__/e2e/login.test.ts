import request from 'graphql-request';
import { GATEWAY_ENDPOINT } from './signup.test';
import User from '../../entities/User';
import { isValid } from 'shortid';
import getSession from '../../helpers/getSession';
import redisClient from '../../helpers/redisClient';

describe('Login', () => {
  beforeAll(async () => {
    const truncateUsersTableQuery = `
      mutation {
        deleteAllUsers
      }
    `;

    await request(GATEWAY_ENDPOINT, truncateUsersTableQuery);

    const signupMutation = `
      mutation {
        signup(newUserData: {
          username: "mockUsername",
          name: "Gabriel",
          password: "mockPassword",
        }) {
          user {
            username
            name
          }
          csrfToken
        }
      }
    `;

    await request(GATEWAY_ENDPOINT, signupMutation);
  });

  it('logs user in if credentials are valid and creates a valid and secure session', async () => {
    const loginMutation = `
      mutation {
        login(username: "mockUsername", password: "mockPassword") {
          user {
            username
          }
          csrfToken
        }
      }
    `;

    const loginResponse = (await request(GATEWAY_ENDPOINT, loginMutation)) as {
      login: { user: User; csrfToken: string };
    };

    expect(loginResponse.login.user.username).toBe('mockUsername');
    expect(isValid(loginResponse.login.csrfToken)).toBe(true);

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

      if (
        session?.userId === loginResponse.login.user.id &&
        session.csrfToken === loginResponse.login.csrfToken
      ) {
        return true;
      }

      return false;
    });

    expect(validSessionWasCreated).toBe(true);
  });
});
