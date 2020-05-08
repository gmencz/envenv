import request from 'graphql-request';
import { GATEWAY_ENDPOINT } from './signup.test';
import User from '../../entities/User';

describe('Login', () => {
  beforeAll(async () => {
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

  it('logs user in if credentials are valid', async () => {
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
      login: User;
    };

    console.log(loginResponse);
  });
});
