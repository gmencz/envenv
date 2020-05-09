import { Resolver, Mutation, Arg, Ctx } from 'type-graphql';
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
import { verify } from 'jsonwebtoken';
import redisClient from '../helpers/redisClient';
import { reach } from 'yup';

@Resolver()
export default class AuthResolver {
  @Mutation(() => AuthResponse)
  async signup(
    @Arg('newUserData') newUserData: UserInput,
    @Ctx() { res }: { res: Response }
  ): Promise<AuthResponse> {
    try {
      await newUserValidation.validate({ ...newUserData });

      const checkUsernameQuery = `
        query queryUserByUsername($username: String!) {
          queryUser(by: username, byValue: $username) {
            id
          }
        }
      `;

      const data = await request(
        'http://users-service:5005/graphql',
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

      const createUserResponse = await request(
        'http://users-service:5005/graphql',
        createUserMutation,
        {
          newUserData,
        }
      );

      const { createUser: newUser } = createUserResponse as {
        createUser: User;
      };

      const newSession = await createSession(newUser.id, redisClient);

      res.cookie('SID', newSession.sessionId, {
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
    @Ctx() { req, res }: { req: Request; res: Response }
  ): Promise<AuthResponse> {
    try {
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
      })) as { picture: string; provider: string; name: string; id: string };

      const { picture, provider, name, id } = userData;

      const checkUserQuery = `
        query queryUserById($id: String!) {
          queryUser(by: id, byValue: $id) {
            id
          }
        }
      `;

      const checkUserResponse = await request(
        'http://users-service:5005/graphql',
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
        'http://users-service:5005/graphql',
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

      const createUserResponse = await request(
        'http://users-service:5005/graphql',
        createUserMutation,
        {
          newUserData: {
            ...newUserData,
            picture,
            provider,
            name,
            id,
            password,
          },
        }
      );

      const { createUser: newUser } = createUserResponse as {
        createUser: User;
      };

      const newSession = await createSession(newUser.id, redisClient);

      res.cookie('SID', newSession.sessionId, {
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
    @Ctx() { res, req }: { res: Response; req: Request }
  ): Promise<AuthResponse> {
    try {
      const cookies = JSON.parse(req.headers.cookie as string);

      if (!cookies.TemporaryUserId) {
        throw new ApolloError('Forbidden, cannot automate login', '403', {
          errorCode: 'forbidden',
        });
      }

      const checkUserQuery = `
        query queryUserById($userId: String!) {
          queryUser(by: id, byValue: $userId) {
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

      const data = await request(
        'http://users-service:5005/graphql',
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

      res.cookie('SID', session.sessionId, {
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
    @Ctx() { req, res }: { req: Request; res: Response }
  ): Promise<AuthResponse> {
    try {
      await reach(newUserValidation, 'username').validate(username);
      await reach(newUserValidation, 'password').validate(password);

      const cookies = JSON.parse(req.headers.cookie as string);

      const getUserQuery = `
        query queryUserByUsername($username: String!) {
          queryUser(by: username, byValue: $username) {
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

      const data = await request(
        'http://users-service:5005/graphql',
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

      if (cookies.SID) {
        const session = await getSession(cookies.SID, redisClient);

        if (!session) {
          const newSession = await createSession(user.id, redisClient);

          res.cookie('SID', newSession.sessionId, {
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

      res.cookie('SID', newSession.sessionId, {
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
}
