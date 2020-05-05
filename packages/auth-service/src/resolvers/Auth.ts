import { Resolver, Mutation, Arg } from 'type-graphql';
import redisClient from '../helpers/redisClient';
import { ApolloError } from 'apollo-server';
import { v4 } from 'uuid';
import SessionResponse from '../graphqlShared/types/SessionResponse';

@Resolver()
export default class AuthResolver {
  @Mutation(() => SessionResponse) // returns csrf token
  async createSession(@Arg('userId') userId: string): Promise<SessionResponse> {
    try {
      const sessionInfo = {
        sessionId: v4(),
        csrfToken: v4(),
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
}
