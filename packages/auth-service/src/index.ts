import { ApolloServer } from 'apollo-server';
import { buildFederatedSchema } from './helpers/buildFederatedSchema';
import Auth, { resolveAuthReference } from './entities/Auth';
import AuthResolver from './resolvers/Auth';

(async () => {
  const schema = await buildFederatedSchema(
    {
      resolvers: [AuthResolver],
      orphanedTypes: [Auth],
    },
    {
      Auth: { __resolveReference: resolveAuthReference },
    }
  );

  const server = new ApolloServer({
    schema,
    tracing: false,
    playground: true,
  });

  const { url } = await server.listen({ port: process.env.SERVICE_PORT });
  console.log(`Auth service listening on ${url}`);
})();
