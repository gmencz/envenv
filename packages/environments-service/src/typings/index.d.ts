import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

interface Auth {
  isAuthenticated: boolean;
  user: {
    id: string;
    role: string;
  };
}

export interface ApolloContext {
  req: Request;
  res: Response;
  prisma: PrismaClient;
  auth: Auth;
}
