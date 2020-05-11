import request from 'graphql-request';
import { GATEWAY_ENDPOINT } from './signup.test';
import { sign } from 'jsonwebtoken';
import User from '../../entities/User';
import { compare } from 'bcryptjs';
import { ApolloError } from 'apollo-server';

describe('Password reset', () => {
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

  it('resets password and invalidates token afterwards', async () => {
    const signupMutation = `
      mutation {
        signup(newUserData: {
          username: "mockUsername",
          name: "Gabriel",
          password: "mockPassword",
          email: "gabriel@envenv.com"
        }) {
          user {
            id
            lastPasswordChange
            username
            name
          }
          csrfToken
        }
      }
    `;

    const signupResponse = await request(GATEWAY_ENDPOINT, signupMutation);

    const {
      signup: { user },
    } = signupResponse as { signup: { user: User } };

    const mockToken = sign(
      { userId: user.id, lastPasswordChange: user.lastPasswordChange },
      process.env.PASSWORD_RESET_SECRET as string,
      {
        expiresIn: 900000,
      }
    );

    const resetPasswordMutation = `
      mutation resetPassword($token: String!) {
        resetPassword(
          newPassword: "mockResetPassword",
          currentPassword: "mockPassword",
          token: $token
        ) {
          password
        }
      }
    `;

    const resetPasswordResponse = await request(
      GATEWAY_ENDPOINT,
      resetPasswordMutation,
      {
        token: mockToken,
      }
    );

    const { resetPassword: resetPasswordUser } = resetPasswordResponse as {
      resetPassword: Pick<User, 'password'>;
    };

    const getUserQuery = `
      query queryUserById($userId: String!) {
        queryUser(by: id, byValue: $userId) {
          id
          username
          password
          lastPasswordChange
        }
      }
    `;

    const data = await request(
      process.env.USERS_SERVICE_URL as string,
      getUserQuery,
      {
        userId: user.id,
      }
    );

    const { queryUser: updatedUser } = data as { queryUser: User };
    const passwordsMatch = await compare(
      'mockResetPassword',
      updatedUser.password
    );

    expect(updatedUser.password).toBe(resetPasswordUser.password);
    expect(passwordsMatch).toBe(true);

    const secondResetPasswordMutation = `
      mutation resetPassword($token: String!) {
        resetPassword(
          newPassword: "mockResetPassword2",
          currentPassword: "mockResetPassword",
          token: $token
        ) {
          password
        }
      }
    `;

    await request(GATEWAY_ENDPOINT, secondResetPasswordMutation, {
      token: mockToken,
    }).catch(error => {
      let validationError = false;

      if (error.response && error.response.errors) {
        validationError = error.response.errors.some(
          (err: ApolloError) => err.extensions.errorCode === 'invalid_token'
        );
      }

      expect(validationError).toBe(true);
    });
  });

  it('allows to reset password as many times as needed', async () => {
    const signupMutation2 = `
      mutation {
        signup(newUserData: {
          username: "mockUsername",
          name: "Gabriel",
          password: "mockPassword",
          email: "gabriel@envenv.com"
        }) {
          user {
            id
            lastPasswordChange
            username
            name
          }
          csrfToken
        }
      }
    `;

    const signupResponse2 = await request(GATEWAY_ENDPOINT, signupMutation2);

    const {
      signup: { user: user2 },
    } = signupResponse2 as { signup: { user: User } };

    const mockToken = sign(
      { userId: user2.id, lastPasswordChange: user2.lastPasswordChange },
      process.env.PASSWORD_RESET_SECRET as string,
      {
        expiresIn: 900000,
      }
    );

    const resetPasswordMutation2 = `
      mutation resetPassword($token: String!) {
        resetPassword(
          newPassword: "mockResetPassword",
          currentPassword: "mockPassword",
          token: $token
        ) {
          password
        }
      }
    `;

    const resetPasswordResponse2 = await request(
      GATEWAY_ENDPOINT,
      resetPasswordMutation2,
      {
        token: mockToken,
      }
    );

    const { resetPassword: resetPasswordUser } = resetPasswordResponse2 as {
      resetPassword: Pick<User, 'password'>;
    };

    const getUserQuery = `
      query queryUserById($userId: String!) {
        queryUser(by: id, byValue: $userId) {
          id
          username
          password
          lastPasswordChange
        }
      }
    `;

    const data = await request(
      process.env.USERS_SERVICE_URL as string,
      getUserQuery,
      {
        userId: user2.id,
      }
    );

    const { queryUser: updatedUser2 } = data as { queryUser: User };
    const passwordsMatch = await compare(
      'mockResetPassword',
      updatedUser2.password
    );

    expect(updatedUser2.password).toBe(resetPasswordUser.password);
    expect(passwordsMatch).toBe(true);

    const signupMutation = `
      mutation {
        signup(newUserData: {
          username: "mockUsername2",
          name: "Gabriel",
          password: "mockPassword",
          email: "gabriel@envenv2.com"
        }) {
          user {
            id
            lastPasswordChange
            username
            name
          }
          csrfToken
        }
      }
    `;

    const signupResponse = await request(GATEWAY_ENDPOINT, signupMutation);

    const {
      signup: { user },
    } = signupResponse as { signup: { user: User } };

    const mockToken2 = sign(
      { userId: user.id, lastPasswordChange: user.lastPasswordChange },
      process.env.PASSWORD_RESET_SECRET as string,
      {
        expiresIn: 900000,
      }
    );

    const resetPasswordMutation = `
      mutation resetPassword($token: String!) {
        resetPassword(
          newPassword: "mockResetPassword",
          currentPassword: "mockPassword",
          token: $token
        ) {
          password
        }
      }
    `;

    const resetPasswordResponse = await request(
      GATEWAY_ENDPOINT,
      resetPasswordMutation,
      {
        token: mockToken2,
      }
    );

    const { resetPassword: resetPasswordUser2 } = resetPasswordResponse as {
      resetPassword: Pick<User, 'password'>;
    };

    const getUserQuery2 = `
      query queryUserById($userId: String!) {
        queryUser(by: id, byValue: $userId) {
          id
          username
          password
          lastPasswordChange
        }
      }
    `;

    const data2 = await request(
      process.env.USERS_SERVICE_URL as string,
      getUserQuery2,
      {
        userId: user.id,
      }
    );

    const { queryUser: updatedUser } = data2 as { queryUser: User };
    const passwordsMatch2 = await compare(
      'mockResetPassword',
      updatedUser.password
    );

    expect(updatedUser.password).toBe(resetPasswordUser2.password);
    expect(passwordsMatch2).toBe(true);
  });

  it(`can't reset password after token has expired`, async () => {
    const signupMutation = `
      mutation {
        signup(newUserData: {
          username: "mockUsername2",
          name: "Gabriel",
          password: "mockPassword",
          email: "gabriel@envenv2.com"
        }) {
          user {
            id
            lastPasswordChange
            username
            name
          }
          csrfToken
        }
      }
    `;

    const signupResponse = await request(GATEWAY_ENDPOINT, signupMutation);

    const {
      signup: { user },
    } = signupResponse as { signup: { user: User } };

    const mockToken = sign(
      { userId: user.id, lastPasswordChange: user.lastPasswordChange },
      process.env.PASSWORD_RESET_SECRET as string,
      {
        expiresIn: -1,
      }
    );

    const resetPasswordMutation = `
      mutation resetPassword($token: String!) {
        resetPassword(
          newPassword: "mockResetPassword",
          currentPassword: "mockPassword",
          token: $token
        ) {
          password
        }
      }
    `;

    await request(GATEWAY_ENDPOINT, resetPasswordMutation, {
      token: mockToken,
    }).catch(error => {
      let validationError = false;

      if (error.response && error.response.errors) {
        validationError = error.response.errors.some(
          (err: ApolloError) => err.extensions.errorCode === 'invalid_token'
        );
      }

      expect(validationError).toBe(true);
    });
  });
});
