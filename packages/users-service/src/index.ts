import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import { buildFederatedSchema } from './helpers/buildFederatedSchema';
import User, { resolveUserReference } from './entities/User';
import UsersResolver from './resolvers/User';
import {
  createConnection,
  getConnectionOptions,
  ConnectionOptions,
} from 'typeorm';
import { ApolloContext } from './graphqlShared/interfaces';
import express from 'express';
import cookieParser from 'cookie-parser';
import { generate as generateUniqueId } from 'shortid';
import { hash } from 'bcryptjs';

(async (): Promise<void> => {
  try {
    const app = express();
    app.use(cookieParser());
    app.use(express.json());

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

    server.applyMiddleware({ app });

    let connectionOptions: ConnectionOptions = await getConnectionOptions(
      'EnvenvMainDatabase'
    );

    if (process.env.NODE_ENV === 'test') {
      connectionOptions = await getConnectionOptions('EnvenvMockDatabase');
    }

    await createConnection({
      ...connectionOptions,
      name: 'default',
    });

    if (
      connectionOptions.synchronize &&
      connectionOptions.dropSchema &&
      process.env.NODE_ENV === 'development'
    ) {
      // Populate our users database for dev.
      await User.createQueryBuilder()
        .insert()
        .into(User)
        .values([
          {
            id: `${generateUniqueId()}${generateUniqueId()}`,
            username: 'gabrielmendezc',
            name: 'Gabriel',
            email: 'gabriel@envenv.com',
            password: await hash('Gabriel123', 12),
          },
          {
            id: `${generateUniqueId()}${generateUniqueId()}`,
            username: 'pexugadepollo',
            name: 'Blas',
            email: 'blas@envenv.com',
            password: await hash('Blas123', 12),
          },
        ])
        .execute();
    }

    app.listen(process.env.SERVICE_PORT, () => {
      console.log(
        `Users service listening on http://localhost:${process.env.SERVICE_PORT}/`
      );
    });
  } catch (error) {
    console.error(error);
  }
})();
