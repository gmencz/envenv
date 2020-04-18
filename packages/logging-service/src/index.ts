import { ApolloServer } from 'apollo-server';
import { buildFederatedSchema } from './helpers/buildFederatedSchema';
import Log, { resolveLogReference } from './entities/Log';
import LogResolver from './resolvers/Log';

(async () => {
  const schema = await buildFederatedSchema(
    {
      resolvers: [LogResolver],
      orphanedTypes: [Log],
    },
    {
      Log: { __resolveReference: resolveLogReference },
    }
  );

  const server = new ApolloServer({
    schema,
    tracing: false,
    playground: true,
  });

  const { url } = await server.listen({ port: process.env.SERVICE_PORT });
  console.log(`Logging service listening on ${url}`);
})();
