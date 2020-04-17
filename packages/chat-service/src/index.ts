import { ApolloServer } from 'apollo-server';
import { buildFederatedSchema } from './helpers/buildFederatedSchema';
import Message, { resolveMessageReference } from './entities/Message';
import MessageResolver from './resolvers/Message';

(async () => {
  const schema = await buildFederatedSchema(
    {
      resolvers: [MessageResolver],
      orphanedTypes: [Message],
    },
    {
      User: { __resolveReference: resolveMessageReference },
    }
  );

  const server = new ApolloServer({
    schema,
    tracing: false,
    playground: true,
  });

  const { url } = await server.listen({ port: 5001 });
  console.log(`Users service listening on ${url}`);
})();
