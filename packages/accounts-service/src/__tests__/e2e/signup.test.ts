import request from 'graphql-request';
import redisClient from '../../helpers/redisClient';
import { SignupResult, SuccessfulSignup } from '../../graphql/generated';
import { compare } from 'bcryptjs';

describe('Signup', () => {
  beforeAll(async () => {
    const truncateUsersTableQuery = `
      mutation {
        deleteAllUsers {
          ... on NotInTestingEnvironment {
            message
          }
          ... on SuccessfulRemoval {
            count
          }
        }
      }
    `;

    await request(process.env.GRAPHQL_ENDPOINT!, truncateUsersTableQuery);
  });

  afterEach(async () => {
    const truncateUsersTableQuery = `
      mutation {
        deleteAllUsers {
          __typename
        }
      }
    `;

    await request(process.env.GRAPHQL_ENDPOINT!, truncateUsersTableQuery);
  });

  afterAll(async () => {
    await new Promise((res, rej) => {
      redisClient.keys('*', (err, keys) => {
        if (err) {
          rej(err);
        }

        keys.forEach(key => {
          redisClient.del(key);
        });

        res();
      });
    });
  });

  it('signs user up if provided data is valid and returns both the user and a valid csrf token', async () => {
    const signupMutation = `
      mutation {
        signup(data: {
          username: "mockUser",
          email: "mock@envenv.com",
          name: "Mock",
          password: "mock123321"
        }) {
          __typename
          ... on SuccessfulSignup {
            user {
              username
              email
              password
            }
          }
        }
      }
    `;

    const signupResponse: { signup: SignupResult } = await request(
      process.env.GRAPHQL_ENDPOINT!,
      signupMutation
    );

    expect(signupResponse.signup.__typename).toBe('SuccessfulSignup');

    const {
      user: { username, email, password },
    } = signupResponse.signup as SuccessfulSignup;

    expect(username).toBe('@mockUser');
    expect(email).toBe('mock@envenv.com');

    const validPassword = await compare('mock123321', password);
    expect(validPassword).toBe(true);
  });
});
