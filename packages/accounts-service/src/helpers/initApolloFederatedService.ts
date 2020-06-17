import { ApolloServer } from 'apollo-server-express';
import { loadFiles, mergeTypeDefs } from 'graphql-tools';
import { join } from 'path';
import { buildFederatedSchema } from '@apollo/federation';
import resolvers from '../graphql/resolvers';
import { ApolloContext } from '../typings';
import { PrismaClient } from '@prisma/client';
import { Express } from 'express';
import { applyMiddleware } from 'graphql-middleware';
import permissions from '../graphql/permissions';
import { buildContext, keyByModelField } from '@envenv/common';
import DataLoader from 'dataloader';

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

  const userLoader = new DataLoader(async ids => {
    const users = await prismaClient.user.findMany({
      where: {
        id: { in: ids as string[] },
      },
    });

    const usersById = keyByModelField(users, 'id');

    return (ids as string[]).map(id => usersById[id]);
  });

  const server = new ApolloServer({
    schema: applyMiddleware(schema, permissions),
    context: ({ req, res }): ApolloContext => {
      return {
        ...buildContext(req, res, prismaClient),
        userLoader,
      };
    },
  });

  server.applyMiddleware({ app });

  return server;
}
