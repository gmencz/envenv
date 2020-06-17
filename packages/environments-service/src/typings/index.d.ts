import { Request, Response } from 'express';
import { PrismaClient, Environment, EnvironmentMember } from '@prisma/client';
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
  environmentLoader: DataLoader<unknown, Pick<Environment, never>, unknown>;
  environmentMemberLoader: DataLoader<
    unknown,
    Pick<EnvironmentMember, never>,
    unknown
  >;
}
