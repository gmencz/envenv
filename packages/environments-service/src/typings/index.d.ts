import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

export interface ApolloContext {
  req: Request;
  res: Response;
  prisma: PrismaClient;
}
