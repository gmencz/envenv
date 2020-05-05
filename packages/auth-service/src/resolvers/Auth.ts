import { Resolver, Mutation, Arg, Query, Ctx } from 'type-graphql';
import redisClient from '../helpers/redisClient';
import { ApolloError } from 'apollo-server';
import SessionResponse from '../graphqlShared/types/SessionResponse';
import { Response, Request } from 'express';
import AuthResponse from '../graphqlShared/types/AuthResponse';
import User from '../entities/User';
import createSession from '../helpers/createSession';
import request from 'graphql-request';

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

  @Query(() => String)
  async getSessionInfo(@Ctx() { req }: { req: Request }): Promise<string> {
    const cookies = JSON.parse(req.headers.cookie as string);

    if (!cookies.SID) {
      throw new ApolloError('Please log in');
    }

    const getSessionFromRedis = (): Promise<unknown> =>
      new Promise((res, rej) => {
        redisClient.get(`session_${cookies.SID}`, (err, reply) => {
          if (err) rej(err);
          res(reply);
        });
      });

    const sessionInfo = await getSessionFromRedis();

    if (!sessionInfo) {
      throw new ApolloError('Log user out...');
    }

    return sessionInfo as string;
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

      const checkUserIdQuery = `
        query isValidUserId($userId: String!) {
          checkUserId(userId: $userId) {
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
        checkUserIdQuery,
        {
          userId: cookies.TemporaryUserId,
        }
      );

      const { checkUserId: user } = data as { checkUserId: User };

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
  async login(): Promise<AuthResponse> {
    // finish this
    return { user: new User(), csrfToken: '' };
  }
}
