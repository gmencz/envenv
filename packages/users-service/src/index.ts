import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import { buildFederatedSchema } from './helpers/buildFederatedSchema';
import User, { resolveUserReference } from './entities/User';
import UsersResolver from './resolvers/User';
import {
  createConnection,
  getConnectionOptions,
  ConnectionOptions,
} from 'typeorm';
import { v4 } from 'uuid';
import { ApolloContext } from './graphqlShared/interfaces';

(async (): Promise<void> => {
  try {
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
      context: ({ req, res }: ApolloContext): ApolloContext => ({
        req,
        res,
      }),
    });

    const connectionOptions: ConnectionOptions = await getConnectionOptions(
      'cloneMainDatabase'
    );
    await createConnection({ ...connectionOptions, name: 'default' });

    if (connectionOptions.synchronize) {
      // Populate our users database for dev.
      await User.createQueryBuilder()
        .insert()
        .into(User)
        .values([
          {
            id: v4(),
            username: 'gabrielmendezc',
            name: 'Gabriel',
            password: 'Gabriel123',
            birthDate: new Date('2002-8-24'),
          },
          {
            id: v4(),
            username: 'pexugadepollo',
            name: 'Blas',
            password: 'Blas123',
            birthDate: new Date('2000'),
          },
        ])
        .execute();
    }

    const { url } = await server.listen({ port: process.env.SERVICE_PORT });

    console.log(`Users service listening on ${url}`);
  } catch (error) {
    console.error(error);
  }
})();
