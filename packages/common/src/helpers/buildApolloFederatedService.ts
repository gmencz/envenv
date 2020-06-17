import { ApolloServer } from 'apollo-server-express';
import { loadFiles, mergeTypeDefs } from 'graphql-tools';
import { buildFederatedSchema } from '@apollo/federation';
import { PrismaClient } from '@prisma/client';
import { Express } from 'express';
import { applyMiddleware, IMiddlewareGenerator } from 'graphql-middleware';
import { Request, Response } from 'express';

interface Auth {
  isAuthenticated: boolean;
  user: {
    id: string;
    role: string;
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

export async function initApolloFederatedService(
  app: Express,
  prismaClient: PrismaClient,
  resolvers: any,
  schemasPath: string,
  permissions: IMiddlewareGenerator<any, any, any>
): Promise<ApolloServer> {
  const spreadServiceSchemas = await loadFiles(schemasPath);
  const mergedSchemaTypeDefs = mergeTypeDefs(spreadServiceSchemas);

  const schema = buildFederatedSchema([
    {
      typeDefs: mergedSchemaTypeDefs,
      resolvers,
    },
  ]);

  const server = new ApolloServer({
    schema: applyMiddleware(schema, permissions),
    context: ({ req, res }: ApolloContext): ApolloContext => {
      return buildContext(req, res, prismaClient);
    },
  });

  server.applyMiddleware({ app });

  return server;
}
