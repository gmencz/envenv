import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import cookieParser from 'cookie-parser';
import connectDatabase from './helpers/connectDatabase';
import { ApolloContext } from './typings';
import { buildFederatedSchema } from '@apollo/federation';
import typeDefs from './graphql/typeDefs';

(async (): Promise<void> => {
  try {
    const app = express();
    app.use(cookieParser());
    app.use(express.json());

    const server = new ApolloServer({
      schema: buildFederatedSchema([
        {
          typeDefs,
          resolvers: {
            Query: {
              environments() {
                return null;
              },
            },
            Environment: {
              __resolveReference(environment) {},
            },
          },
        },
      ]),
      context: ({ req, res }: ApolloContext): ApolloContext => ({
        req,
        res,
      }),
    });

    server.applyMiddleware({ app });

    await connectDatabase();

    const PORT = process.env.SERVICE_PORT;
    app.listen(PORT, () => {
      console.log(
        `Environments service listening on http://localhost:${PORT}/`
      );
    });
  } catch (error) {
    console.error(error);
  }
})();
