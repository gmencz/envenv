import { Resolver, Mutation, Arg, Ctx, Query, Info } from 'type-graphql';
import { ApolloError } from 'apollo-server';
import { Response, Request } from 'express';
import AuthResponse from '../graphqlShared/types/AuthResponse';
import User from '../entities/User';
import createSession from '../helpers/createSession';
import request from 'graphql-request';
import getSession from '../helpers/getSession';
import { compare } from 'bcryptjs';
import UserInput from '../graphqlShared/inputs/UserInput';
import { newUserValidation } from '../entities/User/validation';
import ExternalProviderInput from '../graphqlShared/inputs/ExternalProviderInput';
import { generate } from 'generate-password';
import { verify, sign } from 'jsonwebtoken';
import redisClient from '../helpers/redisClient';
import { reach } from 'yup';
import { createTransport } from 'nodemailer';
import Test from '../graphqlShared/types/Test';
import Environment from '../entities/Environment';
import EnvironmentMember from '../entities/Environment/Member';
import { InfoParameter } from '../graphqlShared/interfaces';
import getASTType from '../helpers/getASTType';
import { print } from 'graphql';

@Resolver()
export default class AuthResolver {
  @Mutation(() => AuthResponse)
  async signup(
    @Arg('newUserData') newUserData: UserInput,
    @Ctx() { res }: { res: Response },
    @Info() { operation }: InfoParameter
  ): Promise<AuthResponse> {
    try {
      const parsedAST = getASTType(print(operation), 'user', 'csrfToken');
      await newUserValidation.validate({ ...newUserData });

      const checkUsernameQuery = `
        query queryUserByUsername($username: String!) {
          queryUser(by: username, byValue: $username) {
            id
          }
        }
      `;

      const data = await request(
        process.env.USERS_SERVICE_URL as string,
        checkUsernameQuery,
        {
          username: newUserData.username,
        }
      );

      const { queryUser: user } = data as { queryUser: User | null };

      if (user) {
        throw new ApolloError(
          'That username is taken, please choose a different one!',
          '400',
          {
            errorCode: 'username_taken',
          }
        );
      }

      const checkEmailQuery = `
        query queryUserByUsername($email: String!) {
          queryUser(by: email, byValue: $email) {
            id
          }
        }
      `;

      const checkEmailResponse = await request(
        process.env.USERS_SERVICE_URL as string,
        checkEmailQuery,
        {
          email: newUserData.email,
        }
      );

      const { queryUser } = checkEmailResponse as { queryUser: User | null };

      if (queryUser) {
        throw new ApolloError(
          'That email is taken, please choose a different one!',
          '400',
          {
            errorCode: 'email_taken',
          }
        );
      }

      const createUserMutation = `
        mutation createUser($newUserData: UserInput!) {
          createUser(newUserData: $newUserData) {
            ${parsedAST}
          }
        }
      `;

      const createUserResponse = await request(
        process.env.USERS_SERVICE_URL as string,
        createUserMutation,
        {
          newUserData,
        }
      );

      const { createUser: newUser } = createUserResponse as {
        createUser: User;
      };

      const newSession = await createSession(newUser.id, redisClient);

      res.cookie('SessionID', newSession.sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: Number(process.env.SESSION_REDIS_EXPIRY as string),
      });

      return { user: newUser, csrfToken: newSession.csrfToken };
    } catch (error) {
      if (error.name === 'ValidationError') {
        throw new ApolloError(error.message, '400', {
          errorCode: 'validation_error',
        });
      }

      if (error instanceof ApolloError) {
        throw error;
      }

      throw new ApolloError(
        `Something went wrong on our side, we're working on it!`,
        '500',
        {
          errorCode: 'server_error',
        }
      );
    }
  }

  @Mutation(() => AuthResponse)
  async signupWithExternalProvider(
    @Arg('newUserData') newUserData: ExternalProviderInput,
    @Ctx() { req, res }: { req: Request; res: Response },
    @Info() { operation }: InfoParameter
  ): Promise<AuthResponse> {
    try {
      const parsedAST = getASTType(print(operation), 'user', 'csrfToken');
      const cookies = JSON.parse(req.headers.cookie as string);

      if (!cookies.NewUserData) {
        throw new ApolloError(
          'Your time to sign up has expired, please proceed to sign up with your provider of choice (google/facebook)',
          '400',
          {
            errorCode: 'expired_signup',
          }
        );
      }

      const userData = (await new Promise((resolve, reject) => {
        verify(
          cookies.NewUserData,
          process.env.SESSION_INFO_SECRET as string,
          (error, sessionInfo) => {
            if (error) {
              reject(error);
            }

            resolve(sessionInfo);
          }
        );
      })) as {
        picture: string;
        provider: string;
        name: string;
        id: string;
        email: string;
      };

      const { picture, provider, name, id, email } = userData;

      const checkUserQuery = `
        query queryUserById($id: String!) {
          queryUser(by: id, byValue: $id) {
            id
          }
        }
      `;

      const checkUserResponse = await request(
        process.env.USERS_SERVICE_URL as string,
        checkUserQuery,
        {
          id: userData.id,
        }
      );

      const { queryUser: user } = checkUserResponse as {
        queryUser: User | null;
      };

      if (user) {
        throw new ApolloError(
          `That ${cookies.NewUserData.provider} account is already registered with us!`,
          '400',
          {
            errorCode: 'already_registered',
          }
        );
      }

      const checkUsernameQuery = `
        query queryUserByUsername($username: String!) {
          queryUser(by: username, byValue: $username) {
            id
          }
        }
      `;

      const checkUsernameResponse = await request(
        process.env.USERS_SERVICE_URL as string,
        checkUsernameQuery,
        {
          username: newUserData.username,
        }
      );

      const { queryUser: userFound } = checkUsernameResponse as {
        queryUser: User | null;
      };

      if (userFound) {
        throw new ApolloError(
          `That username is taken, please choose a different one!`,
          '400',
          {
            errorCode: 'username_taken',
          }
        );
      }

      const password = generate({ length: 19, symbols: true, numbers: true });

      const createUserMutation = `
        mutation createUser($newUserData: UserInput!) {
          createUser(newUserData: $newUserData) {
            ${parsedAST}
          }
        }
      `;

      const createUserResponse = await request(
        process.env.USERS_SERVICE_URL as string,
        createUserMutation,
        {
          newUserData: {
            ...newUserData,
            picture,
            provider,
            name,
            id,
            password,
            email,
          },
        }
      );

      const { createUser: newUser } = createUserResponse as {
        createUser: User;
      };

      const newSession = await createSession(newUser.id, redisClient);

      res.cookie('SessionID', newSession.sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: Number(process.env.SESSION_REDIS_EXPIRY as string),
      });

      res.clearCookie('NewUserData');

      return { user: newUser, csrfToken: newSession.csrfToken };
    } catch (error) {
      if (error instanceof ApolloError) {
        throw error;
      }

      throw new ApolloError(
        `Something went wrong on our side, we're working on it!`,
        '500',
        {
          errorCode: 'server_error',
        }
      );
    }
  }

  @Mutation(() => AuthResponse)
  async automateLoginProcess(
    @Ctx() { res, req }: { res: Response; req: Request },
    @Info() { operation }: InfoParameter
  ): Promise<AuthResponse> {
    try {
      const cookies = JSON.parse(req.headers.cookie as string);
      const parsedAST = getASTType(print(operation), 'user', 'csrfToken');

      if (!cookies.TemporaryUserId) {
        throw new ApolloError('Forbidden, cannot automate login', '403', {
          errorCode: 'forbidden',
        });
      }

      const checkUserQuery = `
        query queryUserById($userId: String!) {
          queryUser(by: id, byValue: $userId) {
            ${parsedAST}
          }
        }
      `;

      const data = await request(
        process.env.USERS_SERVICE_URL as string,
        checkUserQuery,
        {
          userId: cookies.TemporaryUserId,
        }
      );

      const { queryUser: user } = data as { queryUser: User | null };

      if (!user) {
        throw new ApolloError(
          `Invalid user id (${cookies.TemporaryUserId})`,
          '400',
          {
            errorCode: 'invalid_user_id',
          }
        );
      }

      const session = await createSession(user.id, redisClient);

      res.cookie('SessionID', session.sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: Number(process.env.SESSION_REDIS_EXPIRY as string),
      });

      res.clearCookie('TemporaryUserId');

      return { user, csrfToken: session.csrfToken };
    } catch (error) {
      if (error instanceof ApolloError) {
        throw error;
      }

      throw new ApolloError(
        `Something went wrong on our side, we're working on it!`,
        '500',
        {
          errorCode: 'server_error',
        }
      );
    }
  }

  @Mutation(() => AuthResponse)
  async login(
    @Arg('username') username: string,
    @Arg('password') password: string,
    @Ctx() { req, res }: { req: Request; res: Response },
    @Info() { operation }: InfoParameter
  ): Promise<AuthResponse> {
    try {
      const parsedAST = getASTType(print(operation), 'user', 'csrfToken');
      await reach(newUserValidation, 'username').validate(username);
      await reach(newUserValidation, 'password').validate(password);

      const cookies = JSON.parse(req.headers.cookie as string);

      const getUserQuery = `
        query queryUserByUsername($username: String!) {
          queryUser(by: username, byValue: $username) {
            ${parsedAST}
          }
        }
      `;

      const data = await request(
        process.env.USERS_SERVICE_URL as string,
        getUserQuery,
        {
          username,
        }
      );

      const { queryUser: user } = data as { queryUser: User | null };

      if (!user) {
        throw new ApolloError('Invalid credentials', '400', {
          errorCode: 'invalid_credentials',
        });
      }

      const validPassword = await compare(password, user.password);

      if (!validPassword) {
        throw new ApolloError('Invalid credentials', '400', {
          errorCode: 'invalid_credentials',
        });
      }

      if (cookies.SessionID) {
        const session = await getSession(cookies.SessionID, redisClient);

        if (!session) {
          const newSession = await createSession(user.id, redisClient);

          res.cookie('SessionID', newSession.sessionId, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: Number(process.env.SESSION_REDIS_EXPIRY as string),
          });

          return { user, csrfToken: newSession.csrfToken };
        }

        throw new ApolloError('You are already logged in', '403', {
          errorCode: 'already_logged_in',
        });
      }

      const newSession = await createSession(user.id, redisClient);

      res.cookie('SessionID', newSession.sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: Number(process.env.SESSION_REDIS_EXPIRY as string),
      });

      return { user, csrfToken: newSession.csrfToken };
    } catch (error) {
      if (error.name === 'ValidationError') {
        throw new ApolloError(error.message, '400', {
          errorCode: 'validation_error',
        });
      }

      if (error instanceof ApolloError) {
        throw error;
      }

      throw new ApolloError(
        `Something went wrong on our side, we're working on it!`,
        '500',
        {
          errorCode: 'server_error',
        }
      );
    }
  }

  @Query(() => Boolean)
  async requestPasswordResetEmail(
    @Arg('email') email: string
  ): Promise<boolean> {
    try {
      await reach(newUserValidation, 'email').validate(email);

      const getUserQuery = `
        query queryUserByEmail($email: String!) {
          queryUser(by: email, byValue: $email) {
            id
            username
            lastPasswordChange
          }
        }
      `;

      const data = await request(
        process.env.USERS_SERVICE_URL as string,
        getUserQuery,
        {
          email,
        }
      );

      const { queryUser: user } = data as { queryUser: User | null };

      if (!user) {
        return true;
      }

      const transporterSettings = {
        host: process.env.NODEMAILER_HOST as string,
        port: Number(process.env.NODEMAILER_PORT),
        auth: {
          user: process.env.NODEMAILER_USERNAME as string,
          pass: process.env.NODEMAILER_PASSWORD as string,
        },
      };

      const transporter = createTransport(transporterSettings);

      const token = sign(
        { userId: user.id, lastPasswordChange: user.lastPasswordChange },
        process.env.PASSWORD_RESET_SECRET as string,
        {
          expiresIn: 900000, // 15 mins
        }
      );

      const resetPasswordUrl =
        process.env.NODE_ENV === 'production'
          ? `https://envenv.com/auth/resetPassword?token=${token}`
          : `http://localhost:8080/auth/resetPassword?token=${token}`;

      await transporter.sendMail({
        from: 'Envenv <noreply@envenv.com>',
        to: email,
        subject: 'Reset your envenv password',
        html: `
          <div style="font-family: Tahoma">
            <div style="max-width: 800px; width: 100%; margin: 0 auto;  padding: 30px 0;">
              <h1 style="font-size: 22px">Hi ${user.username},</h1>
              <p style="margin-bottom: 30px; color: #565656">You recently requested to reset your password for your Envenv account. Click the button below to reset it.</p>
              <a href="${resetPasswordUrl}" style="padding: 12px; border: none; background-color: #1890FF; cursor: pointer; color: #fff; border-radius: 5px; text-decoration: none;">Reset your password</a>
              <p style="margin-top: 30px; margin-bottom: 30px; color: #565656">If you did not request a password reset, please ignore this email. This password reset is only valid for 15 minutes.</p>
              <hr>
              <p style="margin-top: 30px; margin-bottom: 30px; color: #565656; font-size: 15px">If you're having trouble clicking the password reset button, copy and paste the URL below into your web browser.</p>
              <a style="color: #1890ff; display: block; max-width: 800px; overflow-wrap: break-word;" href="${resetPasswordUrl}">${resetPasswordUrl}</a>
            </div>
            <footer style="text-align: center; background-color: #f9f9f9; position: absolute; bottom: 0; left: 0; width: 100%; height: 200px; line-height: 200px">
              <p style="margin: 0">&copy; ${new Date().getFullYear()} Envenv. All Rights Reserved.</p>
            </footer>  
          </div>      
        `,
      });

      return true;
    } catch (error) {
      if (error.name === 'ValidationError') {
        throw new ApolloError(error.message, '400', {
          errorCode: 'validation_error',
        });
      }

      if (error instanceof ApolloError) {
        throw error;
      }

      throw new ApolloError(
        `Something went wrong on our side, we're working on it!`,
        '500',
        {
          errorCode: 'server_error',
        }
      );
    }
  }

  @Mutation(() => User)
  async resetPassword(
    @Arg('currentPassword') currentPassword: string,
    @Arg('newPassword') newPassword: string,
    @Arg('token') token: string,
    @Info() { operation }: InfoParameter
  ): Promise<User> {
    try {
      const parsedAST = getASTType(print(operation), 'user', 'csrfToken');
      const decodedToken = verify(
        token,
        process.env.PASSWORD_RESET_SECRET as string
      ) as { userId: string; lastPasswordChange: Date | null };

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
          userId: decodedToken.userId,
        }
      );

      const { queryUser: user } = data as { queryUser: User | null };

      if (!user) {
        throw new ApolloError(
          'Invalid token, please request a new password reset',
          '400',
          {
            errorCode: 'invalid_token',
          }
        );
      }

      if (
        !(decodedToken.lastPasswordChange instanceof Date) ||
        !(user.lastPasswordChange instanceof Date)
      ) {
        if (decodedToken.lastPasswordChange !== user.lastPasswordChange) {
          throw new ApolloError(
            'Invalid token, please request a new password reset',
            '400',
            {
              errorCode: 'invalid_token',
            }
          );
        }

        await reach(newUserValidation, 'password').validate(newPassword);

        const validCurrentPassword = await compare(
          currentPassword,
          user.password
        );

        if (!validCurrentPassword) {
          throw new ApolloError(
            'Your current password does not match the one you provided',
            '400',
            {
              errorCode: 'invalid_password',
            }
          );
        }

        const updatePasswordOperation = `
        mutation updatePassword($userToUpdateId: String!, $newValue: String!) {
          updateUser(by: password, userToUpdateId: $userToUpdateId, newValue: $newValue) {
            id
            picture
            provider
            username
            name
            email
            password
            role
            membersOfEnvironments {
              id
            }
          }
        }
      `;

        await request(
          process.env.USERS_SERVICE_URL as string,
          updatePasswordOperation,
          {
            userToUpdateId: user.id,
            newValue: newPassword,
          }
        );

        const updateLastPasswordChangeOperation = `
        mutation updateLastPasswordChange($userToUpdateId: String!, $newValue: String!) {
          updateUser(by: lastPasswordChange, userToUpdateId: $userToUpdateId, newValue: $newValue) {
            ${parsedAST}
          }
        }
      `;

        const updateLastPasswordChangeResponse = await request(
          process.env.USERS_SERVICE_URL as string,
          updateLastPasswordChangeOperation,
          {
            userToUpdateId: user.id,
            newValue: new Date(),
          }
        );

        const {
          updateUser: updatedUser,
        } = updateLastPasswordChangeResponse as {
          updateUser: User;
        };

        return updatedUser;
      }

      if (
        decodedToken.lastPasswordChange.getTime() !==
        user.lastPasswordChange.getTime()
      ) {
        throw new ApolloError(
          'Invalid token, please request a new password reset',
          '400',
          {
            errorCode: 'invalid_token',
          }
        );
      }

      await reach(newUserValidation, 'password').validate(newPassword);

      const validCurrentPassword = await compare(
        currentPassword,
        user.password
      );

      if (!validCurrentPassword) {
        throw new ApolloError(
          'Your current password does not match the one you provided',
          '400',
          {
            errorCode: 'invalid_password',
          }
        );
      }

      const updatePasswordOperation = `
        mutation updatePassword($userToUpdateId: String!, $newValue: String!) {
          updateUser(by: password, userToUpdateId: $userToUpdateId, newValue: $newValue) {
            id
            picture
            provider
            username
            name
            email
            password
            role
            membersOfEnvironments {
              id
            }
          }
        }
      `;

      await request(
        process.env.USERS_SERVICE_URL as string,
        updatePasswordOperation,
        {
          userToUpdateId: user.id,
          newValue: newPassword,
        }
      );

      const updateLastPasswordChangeOperation = `
        mutation updateLastPasswordChange($userToUpdateId: String!, $newValue: String!) {
          updateUser(by: lastPasswordChange, userToUpdateId: $userToUpdateId, newValue: $newValue) {
            ${parsedAST}
          }
        }
      `;

      const updateLastPasswordChangeResponse = await request(
        process.env.USERS_SERVICE_URL as string,
        updateLastPasswordChangeOperation,
        {
          userToUpdateId: user.id,
          newValue: new Date(),
        }
      );

      const { updateUser: updatedUser } = updateLastPasswordChangeResponse as {
        updateUser: User;
      };

      return updatedUser;
    } catch (error) {
      console.log(error);
      if (
        error.name === 'JsonWebTokenError' ||
        error.name === 'TokenExpiredError'
      ) {
        throw new ApolloError(
          'Invalid token, please request a new password reset',
          '400',
          {
            errorCode: 'invalid_token',
          }
        );
      }

      if (error.name === 'ValidationError') {
        throw new ApolloError(error.message, '400', {
          errorCode: 'validation_error',
        });
      }

      if (error instanceof ApolloError) {
        throw error;
      }

      throw new ApolloError(
        `Something went wrong on our side, we're working on it!`,
        '500',
        {
          errorCode: 'server_error',
        }
      );
    }
  }

  @Query(() => Test)
  async mockEnv(): Promise<Test> {
    return {
      environment: new Environment(),
      environmentMember: new EnvironmentMember(),
    };
  }
}
