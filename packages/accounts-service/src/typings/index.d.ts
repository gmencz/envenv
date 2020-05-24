import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

interface Auth {
  isAuthenticated: boolean;
  userId: string;
}

export interface ApolloContext {
  req: Request;
  res: Response;
  prisma: PrismaClient;
  auth: Auth;
}
