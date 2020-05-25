import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import { loadFiles, mergeTypeDefs } from 'graphql-tools';
import { join } from 'path';
import { buildFederatedSchema } from '@apollo/federation';
import resolvers from '../graphql/resolvers';
import { ApolloContext } from '../typings';
import { PrismaClient } from '@prisma/client';
import { Express } from 'express';

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
    },
    engine: false,
  });

  server.applyMiddleware({ app });

  return server;
}
