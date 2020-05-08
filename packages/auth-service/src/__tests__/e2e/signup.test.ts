import request from 'graphql-request';
import AuthResponse from '../../graphqlShared/types/AuthResponse';
import { isValid } from 'shortid';
import { ApolloError } from 'apollo-server';
import getSession from '../../helpers/getSession';
import redisClient from '../../helpers/redisClient';

export const GATEWAY_ENDPOINT = 'http://api-gateway:7000/graphql';

describe('Signup', () => {
  beforeAll(async () => {
    const truncateUsersTableQuery = `
      mutation {
        deleteAllUsers
      }
    `;

    await request(GATEWAY_ENDPOINT, truncateUsersTableQuery);
  });

  afterEach(async () => {
    const truncateUsersTableQuery = `
      mutation {
        deleteAllUsers
      }
    `;

    await request(GATEWAY_ENDPOINT, truncateUsersTableQuery);
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

    redisClient.quit();
  });

  it('signs user up if provided data is valid and returns both the user and a valid csrf token', async () => {
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

    const signupResponse = (await request(
      GATEWAY_ENDPOINT,
      signupMutation
    )) as { signup: AuthResponse };

    expect(signupResponse.signup.user).toBeTruthy();
    expect(signupResponse.signup.csrfToken).toBeTruthy();
    expect(signupResponse.signup.user.username).toBe('mockUsername');
    expect(signupResponse.signup.user.name).toBe('Gabriel');
    expect(isValid(signupResponse.signup.csrfToken)).toBeTruthy();
  });

  it(`throws error if the new user's data is invalid or doesn't meet security requirements`, async () => {
    const invalidUsernameMutation = `
        mutation {
          signup(newUserData: {
            username: "a",
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

    await request(GATEWAY_ENDPOINT, invalidUsernameMutation).catch(error => {
      let validationError = false;

      if (error.response && error.response.errors) {
        validationError = error.response.errors.some(
          (err: ApolloError) => err.message === 'That username is too short!'
        );
      }

      expect(validationError).toBeTruthy();
    });

    const invalidNameMutation = `
        mutation {
          signup(newUserData: {
            username: "mockUsername",
            name: "G",
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

    await request(GATEWAY_ENDPOINT, invalidNameMutation).catch(error => {
      let validationError = false;

      if (error.response && error.response.errors) {
        validationError = error.response.errors.some(
          (err: ApolloError) => err.message === 'That name is too short!'
        );
      }

      expect(validationError).toBeTruthy();
    });

    const insecurePasswordMutation = `
        mutation {
          signup(newUserData: {
            username: "mockUsername",
            name: "Gabriel",
            password: "123",
          }) {
            user {
              username
              name
            }
            csrfToken
          }
        }
      `;

    await request(GATEWAY_ENDPOINT, insecurePasswordMutation).catch(error => {
      let validationError = false;

      if (error.response && error.response.errors) {
        validationError = error.response.errors.some(
          (err: ApolloError) => err.message === 'That password is too short!'
        );
      }

      expect(validationError).toBeTruthy();
    });

    const invalidPfpUrlMutation = `
        mutation {
          signup(newUserData: {
            username: "mockUsername",
            name: "Gabriel",
            password: "securePassword132",
            picture: "notAnUrl"
          }) {
            user {
              username
              name
            }
            csrfToken
          }
        }
      `;

    await request(GATEWAY_ENDPOINT, invalidPfpUrlMutation).catch(error => {
      let validationError = false;

      if (error.response && error.response.errors) {
        validationError = error.response.errors.some(
          (err: ApolloError) =>
            err.message === 'That profile picture is invalid!'
        );
      }

      expect(validationError).toBeTruthy();
    });
  });

  it('throws error if username is taken', async () => {
    const createUserMutation = `
      mutation createUser($newUserData: UserInput!) {
        createUser(newUserData: $newUserData) {
          id
          picture
          provider
          username
          name
          password
          role
        }
      }
    `;

    await request(GATEWAY_ENDPOINT, createUserMutation, {
      newUserData: {
        username: 'gabrielmendezc',
        name: 'Gabriel',
        password: 'mockPassword123',
      },
    });

    const takenUsernameMutation = `
      mutation {
        signup(newUserData: {
          username: "gabrielmendezc",
          name: "Gabriel",
          password: "mockPassword321",
        }) {
          user {
            username
            name
          }
          csrfToken
        }
      }
    `;

    await request(GATEWAY_ENDPOINT, takenUsernameMutation).catch(error => {
      let validationError = false;

      if (error.response && error.response.errors) {
        validationError = error.response.errors.some(
          (err: ApolloError) => err.extensions.errorCode === 'username_taken'
        );
      }

      expect(validationError).toBeTruthy();
    });
  });

  it('signs user up and creates a valid and secure session', async () => {
    const signupMutation = `
      mutation {
        signup(newUserData: {
          username: "mockUsername",
          name: "Gabriel",
          password: "mockPassword",
        }) {
          user {
            id
          }
          csrfToken
        }
      }
    `;

    const signupResponse = (await request(
      GATEWAY_ENDPOINT,
      signupMutation
    )) as { signup: AuthResponse };

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
        session?.userId === signupResponse.signup.user.id &&
        session.csrfToken === signupResponse.signup.csrfToken
      ) {
        return true;
      }

      return false;
    });

    expect(validSessionWasCreated).toBe(true);
  });
});
