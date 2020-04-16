import { ApolloServer } from 'apollo-server';
import { buildFederatedSchema } from './helpers/buildFederatedSchema';
import User, { resolveUserReference } from './entities/User';
import UsersResolver from './resolvers/User';

(async () => {
  const schema = await buildFederatedSchema(
    {
      resolvers: [UsersResolver],
      orphanedTypes: [User],
    },
    {
      User: { __resolveReference: resolveUserReference },
    }
  );

  const server = new ApolloServer({
    schema,
    tracing: false,
    playground: true,
  });

  const { url } = await server.listen({ port: 5005 });
  console.log(`Users service listening on ${url}`);
})();
