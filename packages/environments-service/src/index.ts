import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import cookieParser from 'cookie-parser';
import { ApolloContext } from './typings';
import { buildFederatedSchema } from '@apollo/federation';
import typeDefs from './graphql/typeDefs';
import { PrismaClient } from '@prisma/client';
import resolvers from './graphql/resolvers';

const prisma = new PrismaClient();

(async (): Promise<void> => {
  try {
    const app = express();
    app.use(cookieParser());
    app.use(express.json());

    const server = new ApolloServer({
      schema: buildFederatedSchema([
        {
          typeDefs,
          resolvers: resolvers as any,
        },
      ]),
      context: ({ req, res }: ApolloContext): ApolloContext => ({
        req,
        res,
        prisma,
      }),
    });

    server.applyMiddleware({ app });

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
