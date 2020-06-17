import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

interface Auth {
  isAuthenticated: boolean;
  user: {
    id: string;
    role: 'USER' | 'ADMIN';
  };
}

interface ApolloContext {
  req: Request;
  res: Response;
  prisma: PrismaClient;
  auth: Auth;
}

export function buildContext(
  req: Request,
  res: Response,
  prismaClient: PrismaClient
): ApolloContext {
  try {
    const isAuthenticated = !!req.headers['user'];
    const user = req.headers['user']
      ? JSON.parse(req.headers['user'] as string)
      : null;

    return {
      req,
      res,
      prisma: prismaClient,
      auth: {
        isAuthenticated,
        user,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      req,
      res,
      prisma: prismaClient,
      auth: {
        isAuthenticated: false,
        user: (null as unknown) as Auth['user'],
      },
    };
  }
}
