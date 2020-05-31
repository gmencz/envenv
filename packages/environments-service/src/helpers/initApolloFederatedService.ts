import { ApolloServer } from 'apollo-server-express';
import { loadFiles, mergeTypeDefs } from 'graphql-tools';
import { join } from 'path';
import { buildFederatedSchema } from '@apollo/federation';
import resolvers from '../graphql/resolvers';
import { ApolloContext, Auth } from '../typings';
import { PrismaClient } from '@prisma/client';
import { Express, Request, Response } from 'express';
import { applyMiddleware } from 'graphql-middleware';
import permissions from '../graphql/permissions';

const buildContext = (
  req: Request,
  res: Response,
  prismaClient: PrismaClient
): ApolloContext => {
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
};

export default async function initApolloFederatedService(
  app: Express,
  prismaClient: PrismaClient
): Promise<ApolloServer> {
  const spreadServiceSchemas = await loadFiles(
    join(__dirname, '../graphql/schemas')
  );
  const mergedSchemaTypeDefs = mergeTypeDefs(spreadServiceSchemas);

  const schema = buildFederatedSchema([
    {
      typeDefs: mergedSchemaTypeDefs,
      resolvers: resolvers as any,
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
