import request from 'graphql-request';
import { sign } from 'jsonwebtoken';
import { compare, hash } from 'bcryptjs';
import {
  SignupResult,
  SuccessfulSignup,
  User,
  ResetPasswordResult,
} from '../../graphql/generated';
import { PrismaClient } from '@prisma/client';

describe('Password reset', () => {
  const prisma = new PrismaClient();

  beforeAll(async () => {
    const truncateUsersTableQuery = `
      mutation DeleteUsersForTesting {
        deleteAllUsers {
          __typename
        }
      }
    `;

    await request(process.env.GRAPHQL_ENDPOINT!, truncateUsersTableQuery);
  });

  afterEach(async () => {
    const truncateUsersTableQuery = `
      mutation DeleteUsersForTesting {
        deleteAllUsers {
          __typename
        }
      }
    `;

    await request(process.env.GRAPHQL_ENDPOINT!, truncateUsersTableQuery);
  });

  afterAll(async () => {
    await prisma.disconnect();
  });

  it('resets password and invalidates token afterwards', async () => {
    const signupMutation = `
      mutation SignUp {
        signup(data: {
          username: "mockUsername",
          name: "mockUser",
          password: "mockPassword",
          email: "mock@envenv.com"
        }) {
          __typename
          ... on SuccessfulSignup {
            user {
              id
              username
              email
              password
              lastPasswordChange
            }
          }
        }
      }
    `;

    const signupResponse: { signup: SignupResult } = await request(
      process.env.GRAPHQL_ENDPOINT!,
      signupMutation
    );

    const { signup } = signupResponse;
    expect(signup.__typename).toBe('SuccessfulSignup');

    const { user } = signup as SuccessfulSignup;

    const mockToken = sign(
      { userId: user.id, lastPasswordChange: user.lastPasswordChange },
      process.env.PASSWORD_RESET_SECRET!,
      {
        expiresIn: 900000, // 15 mins
      }
    );

    const resetPasswordMutation = `
      mutation ResetPassword($token: String!) {
        resetPassword(data: {
          newPassword: "mockResetPassword",
          currentPassword: "mockPassword",
          token: $token
        }) {
          __typename
          ... on User {
            password
          }
        }
      }
    `;

    await request(process.env.GRAPHQL_ENDPOINT!, resetPasswordMutation, {
      token: mockToken,
    });

    const updatedUser = await prisma.user.findOne({ where: { id: user.id } });

    expect(updatedUser).toBeTruthy();
    if (!updatedUser) return;

    const passwordsMatch = await compare(
      'mockResetPassword',
      updatedUser.password
    );

    expect(passwordsMatch).toBe(true);

    const secondResetPasswordMutation = `
      mutation resetPassword($token: String!) {
        resetPassword(data: {
          newPassword: "mockResetPassword2",
          currentPassword: "mockResetPassword",
          token: $token
        }) {
          __typename
          ... on User {
            password
          }
        }
      }
    `;

    const response: { resetPassword: ResetPasswordResult } = await request(
      process.env.GRAPHQL_ENDPOINT!,
      secondResetPasswordMutation,
      {
        token: mockToken,
      }
    );

    expect(response.resetPassword.__typename).toBe('InvalidOrExpiredToken');
  });

  it('allows to reset password as many times as needed', async () => {
    // First reset ->
    const user = await prisma.user.create({
      data: {
        username: 'mockUsername',
        name: 'mockUser',
        password: await hash('mockPassword', 12),
        email: 'mock@envenv.com',
      },
    });

    const mockToken = sign(
      { userId: user.id, lastPasswordChange: user.lastPasswordChange },
      process.env.PASSWORD_RESET_SECRET!,
      {
        expiresIn: 900000,
      }
    );

    const resetPasswordMutation = `
      mutation resetPassword($token: String!) {
        resetPassword(data: {
          newPassword: "mockResetPassword",
          currentPassword: "mockPassword",
          token: $token
        }) {
          __typename
          ... on User {
            id
            password
          }
        }
      }
    `;

    const resetPasswordResponse: {
      resetPassword: ResetPasswordResult;
    } = await request(process.env.GRAPHQL_ENDPOINT!, resetPasswordMutation, {
      token: mockToken,
    });

    expect(resetPasswordResponse.resetPassword.__typename).toBe('User');

    const { id } = resetPasswordResponse.resetPassword as User;
    const updatedUser = await prisma.user.findOne({ where: { id } });

    expect(updatedUser).toBeTruthy();
    if (!updatedUser) return;

    const passwordsMatch = await compare(
      'mockResetPassword',
      updatedUser.password
    );

    expect(passwordsMatch).toBe(true);

    const secondMockToken = sign(
      {
        userId: updatedUser.id,
        lastPasswordChange: updatedUser.lastPasswordChange,
      },
      process.env.PASSWORD_RESET_SECRET!,
      {
        expiresIn: 900000,
      }
    );

    const secondResetPasswordMutation = `
      mutation resetPassword($token: String!) {
        resetPassword(data: {
          newPassword: "mockResetPassword2",
          currentPassword: "mockResetPassword",
          token: $token
        }) {
          __typename
          ... on User {
            id
            password
          }
        }
      }
    `;

    const secondResetPasswordResponse: {
      resetPassword: ResetPasswordResult;
    } = await request(
      process.env.GRAPHQL_ENDPOINT!,
      secondResetPasswordMutation,
      {
        token: secondMockToken,
      }
    );

    expect(secondResetPasswordResponse.resetPassword.__typename).toBe('User');

    const {
      id: secondUserId,
    } = secondResetPasswordResponse.resetPassword as User;
    const secondUpdatedUser = await prisma.user.findOne({
      where: { id: secondUserId },
    });

    expect(secondUpdatedUser).toBeTruthy();
    if (!secondUpdatedUser) return;

    const secondPasswordsMatch = await compare(
      'mockResetPassword2',
      secondUpdatedUser.password
    );

    expect(secondPasswordsMatch).toBe(true);
  });

  it(`can't reset password after token has expired`, async () => {
    const signupMutation = `
      mutation SignUp {
        signup(data: {
          username: "mockUsername",
          name: "mockUser",
          password: "mockPassword",
          email: "mock@envenv.com"
        }) {
          __typename
          ... on SuccessfulSignup {
            user {
              id
              username
              email
              password
              lastPasswordChange
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
    const { user } = signupResponse.signup as SuccessfulSignup;

    const mockToken = sign(
      { userId: user.id, lastPasswordChange: user.lastPasswordChange },
      process.env.PASSWORD_RESET_SECRET!,
      {
        expiresIn: -1,
      }
    );

    const resetPasswordMutation = `
      mutation resetPassword($token: String!) {
        resetPassword(data: {
          newPassword: "mockResetPassword2",
          currentPassword: "mockResetPassword",
          token: $token
        }) {
          __typename
          ... on User {
            id
            password
          }
        }
      }
    `;

    const resetResponse: { resetPassword: ResetPasswordResult } = await request(
      process.env.GRAPHQL_ENDPOINT!,
      resetPasswordMutation,
      {
        token: mockToken,
      }
    );

    expect(resetResponse.resetPassword.__typename).toBe(
      'InvalidOrExpiredToken'
    );
  });
});
