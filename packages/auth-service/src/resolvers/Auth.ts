import { Resolver, Mutation, Arg, Ctx } from 'type-graphql';
import { ApolloError } from 'apollo-server';
import SessionResponse from '../graphqlShared/types/SessionResponse';
import { Response, Request } from 'express';
import AuthResponse from '../graphqlShared/types/AuthResponse';
import User from '../entities/User';
import createSession from '../helpers/createSession';
import request from 'graphql-request';
import getSession from '../helpers/getSession';
import { compare } from 'bcryptjs';

@Resolver()
export default class AuthResolver {
  @Mutation(() => SessionResponse) // returns csrf token
  async createSession(@Arg('userId') userId: string): Promise<SessionResponse> {
    try {
      const session = createSession(userId);
      return session;
    } catch (error) {
      if (error instanceof ApolloError) {
        throw error;
      }

      throw new ApolloError(
        `Something went wrong on our side, we're working on it!`,
        '500'
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
        throw new ApolloError('Forbidden, cannot automate login', '403');
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
            birthDate
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

      const { queryUser: user } = data as { queryUser: User };

      const session = createSession(user.id);

      res.cookie('SID', session.sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: Number(process.env.SESSION_REDIS_EXPIRY as string),
      });

      res.clearCookie('TemporaryUserId');

      return { user, csrfToken: session.csrfToken };
    } catch (error) {
      console.log(error);
      if (error instanceof ApolloError) {
        throw error;
      }

      throw new ApolloError(
        `Something went wrong on our side, we're working on it!`,
        '500'
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
          birthDate
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

      const { queryUser: user } = data as { queryUser: User };

      const validPassword = await compare(password, user.password);

      if (!validPassword) {
        throw new ApolloError('Invalid credentials', '400');
      }

      if (cookies.SID) {
        const session = await getSession(cookies.SID);

        if (!session) {
          const newSession = createSession(user.id);

          res.cookie('SID', newSession.sessionId, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: Number(process.env.SESSION_REDIS_EXPIRY as string),
          });

          return { user, csrfToken: newSession.csrfToken };
        }

        throw new ApolloError('You are already logged in', '403');
      }

      const newSession = createSession(user.id);

      res.cookie('SID', newSession.sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: Number(process.env.SESSION_REDIS_EXPIRY as string),
      });

      return { user, csrfToken: newSession.csrfToken };
    } catch (error) {
      if (error.response && Array.isArray(error.response.errors)) {
        const userNotFound = error.response.errors.find(
          error => error.extensions.errorCode === 'user_not_found'
        );

        if (userNotFound) {
          throw new ApolloError('Invalid credentials', '400');
        }

        throw new ApolloError(
          error.response.errors[0].message,
          error.response.errors[0].code
        );
      }

      if (error instanceof ApolloError) {
        throw error;
      }

      throw new ApolloError(
        `Something went wrong on our side, we're working on it!`,
        '500'
      );
    }
  }
}
