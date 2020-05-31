import {
  ApolloServer,
  ApolloError,
  AuthenticationError,
} from 'apollo-server-express';
import { loadFiles, mergeTypeDefs } from 'graphql-tools';
import { join } from 'path';
import { buildFederatedSchema } from '@apollo/federation';
import resolvers from '../graphql/resolvers';
import { ApolloContext } from '../typings';
import { PrismaClient } from '@prisma/client';
import { Express, Request, Response } from 'express';

const buildContext = (
  req: Request,
  res: Response,
  prismaClient: PrismaClient
): ApolloContext => {
  try {
    console.log(req.headers['user']);
    const isAuthenticated = !!req.headers['user'];
    const user = req.headers['user']
      ? JSON.parse(req.headers['user'] as string)
      : null;

    if (!user || !isAuthenticated) {
      throw new AuthenticationError('Unauthorized');
    }

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
    throw new AuthenticationError('Unauthorized');
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

  const server = new ApolloServer({
    schema: buildFederatedSchema([
      {
        typeDefs: mergedSchemaTypeDefs,
        resolvers: resolvers as any,
      },
    ]),
    context: ({ req, res }: ApolloContext): ApolloContext => {
      return buildContext(req, res, prismaClient);
    },
  });

  server.applyMiddleware({ app });

  return server;
}
