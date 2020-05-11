import { MiddlewareFn } from 'type-graphql';
import { Request, Response } from 'express';
import { AuthenticationError } from 'apollo-server';
import getSession from '../helpers/getSession';
import redisClient from '../helpers/redisClient';
import request from 'graphql-request';
import User from '../entities/User';

export interface ApolloContext {
  req: Request;
  res: Response;
  user: User | null;
}

const isAuth: MiddlewareFn<ApolloContext> = async ({ context }, next) => {
  try {
    const cookies = JSON.parse(context.req.headers.cookie as string);

    if (!cookies.SessionID) {
      context.user = null;
      throw new AuthenticationError(
        `You're not logged in, please log in to proceed`
      );
    }

    const session = await getSession(cookies.SessionID, redisClient);

    if (!session) {
      context.user = null;
      context.res.clearCookie('SessionID');
      throw new AuthenticationError(
        `You're not logged in, please log in to proceed`
      );
    }

    const findUserQuery = `
      query queryUserById($userId: String!) {
        queryUser(by: id, byValue: $userId) {
          id
          picture
          provider
          username
          name
          email
          password
          role
        }
      }
    `;

    const data = await request(
      process.env.USERS_SERVICE_URL as string,
      findUserQuery,
      {
        userId: session.userId,
      }
    );

    const { queryUser: user } = data as { queryUser: User | null };

    if (!user) {
      context.user = null;
      context.res.clearCookie('SessionID');
      throw new AuthenticationError(
        `You're not logged in, please log in to proceed`
      );
    }

    context.user = { ...user };
    return next();
  } catch (error) {
    context.user = null;
    throw new AuthenticationError(
      `You're not logged in, please log in to proceed`
    );
  }
};

export default isAuth;
