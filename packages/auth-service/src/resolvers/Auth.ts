import { Resolver, Mutation, Arg, Query, Ctx } from 'type-graphql';
import redisClient from '../helpers/redisClient';
import { ApolloError } from 'apollo-server';
import SessionResponse from '../graphqlShared/types/SessionResponse';
import { Request } from 'express';
import { generate as generateUniqueId } from 'shortid';

@Resolver()
export default class AuthResolver {
  @Mutation(() => SessionResponse) // returns csrf token
  async createSession(@Arg('userId') userId: string): Promise<SessionResponse> {
    try {
      const sessionInfo = {
        sessionId: `${generateUniqueId()}${generateUniqueId()}`,
        csrfToken: `${generateUniqueId()}${generateUniqueId()}`,
        userId,
      };

      redisClient.set(
        `session_${sessionInfo.sessionId}`,
        JSON.stringify(sessionInfo),
        'EX',
        Number(process.env.SESSION_REDIS_EXPIRY as string)
      );

      return {
        csrfToken: sessionInfo.csrfToken,
        sessionId: sessionInfo.sessionId,
      };
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
}
