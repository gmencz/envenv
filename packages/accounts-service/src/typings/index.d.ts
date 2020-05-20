import { Request, Response } from 'express';
import { PrismaClient, User } from '@prisma/client';

export interface ApolloContext {
  req: Request;
  res: Response;
  user: User | null;
  prisma: PrismaClient;
}
