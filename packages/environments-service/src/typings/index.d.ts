import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { User } from '../graphql/generated';

export interface ApolloContext {
  req: Request;
  res: Response;
  prisma: PrismaClient;
  user: User | null;
  /*
    Remove the user as part of the context since it doesn't
    really make sense, instead add something more appropiate
    for authentication decisions, this is just a placeholder.
  */
}
