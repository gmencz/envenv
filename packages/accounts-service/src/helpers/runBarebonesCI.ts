import express from 'express';
import { loadFiles, mergeTypeDefs } from 'graphql-tools';
import { buildFederatedSchema } from '@apollo/federation';
import { join } from 'path';
import { ApolloServer } from 'apollo-server-express';

async function main(): Promise<void> {
  const app = express();
  const spreadServiceSchemas = await loadFiles(
    join(__dirname, '../graphql/schemas')
  );

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
  app.listen(5000);
}

main();
