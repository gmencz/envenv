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

  const environmentLoader = new DataLoader(async ids => {
    const environments = await prismaClient.environment.findMany({
      where: {
        id: { in: ids as string[] },
      },
    });

    const environmentsById = keyByModelField(environments, 'id');

    return (ids as string[]).map(id => environmentsById[id]);
  });

  const environmentMemberLoader = new DataLoader(async ids => {
    const environmentMembers = await prismaClient.environmentMember.findMany({
      where: {
        id: { in: ids as string[] },
      },
    });

    const environmentMembersById = keyByModelField(environmentMembers, 'id');

    return (ids as string[]).map(id => environmentMembersById[id]);
  });

  const server = new ApolloServer({
    schema: applyMiddleware(schema, permissions),
    context: ({ req, res }): ApolloContext => {
      return {
        ...buildContext(req, res, prismaClient),
        environmentLoader,
        environmentMemberLoader,
      };
    },
  });

  server.applyMiddleware({ app });

  return server;
}
