import { ApolloServer } from 'apollo-server-express';
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
    context: ({ req, res }: ApolloContext): ApolloContext => ({
      req,
      res,
      user: null,
      prisma: prismaClient,
    }),
    engine: false,
  });

  server.applyMiddleware({ app });

  return server;
}
