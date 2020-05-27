import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import { loadFiles, mergeTypeDefs } from 'graphql-tools';
import { join } from 'path';
import { buildFederatedSchema } from '@apollo/federation';
import resolvers from '../graphql/resolvers';
import { ApolloContext, Auth } from '../typings';
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
    },
    engine: {
      apiKey: process.env.AGM_USER_KEY,
    },
  });

  server.applyMiddleware({ app });

  return server;
}
