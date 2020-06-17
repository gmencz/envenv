import { Request, Response } from 'express';
import { PrismaClient, User } from '@prisma/client';
import DataLoader from 'dataloader';

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
  userLoader: DataLoader<unknown, Pick<User, never>, unknown>;
}
