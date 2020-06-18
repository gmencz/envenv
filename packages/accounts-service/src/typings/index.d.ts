import { Request, Response } from 'express';
import { PrismaClient, User, UserRole } from '@prisma/client';
import DataLoader from 'dataloader';

interface Auth {
  isAuthenticated: boolean;
  user: {
    id: string;
    role: UserRole;
  };
}

export interface ApolloContext {
  req: Request;
  res: Response;
  prisma: PrismaClient;
  auth: Auth;
  userLoader: DataLoader<unknown, Pick<User, never>, unknown>;
}
