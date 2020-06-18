import express from 'express';
import { loadFiles, mergeTypeDefs } from 'graphql-tools';
import { buildFederatedSchema } from '@apollo/federation';
import { ApolloServer } from 'apollo-server-express';

export async function buildBarebonesFederatedService(
  schemasDirectory: string,
  port: number
): Promise<void> {
  const app = express();
  const spreadServiceSchemas = await loadFiles(schemasDirectory);
  const mergedSchemaTypeDefs = mergeTypeDefs(spreadServiceSchemas);

  const schema = buildFederatedSchema([
    {
      typeDefs: mergedSchemaTypeDefs,
    },
  ]);

  const server = new ApolloServer({
    schema,
  });

  server.applyMiddleware({ app });
  app.listen(port);
}
