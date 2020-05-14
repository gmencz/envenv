import { Request, Response } from 'express';
import User from '../entities/User';
import { PrismaClient } from '@prisma/client';

export interface ApolloContext {
  req: Request;
  res: Response;
  user: User | null;
  prisma: PrismaClient;
}
