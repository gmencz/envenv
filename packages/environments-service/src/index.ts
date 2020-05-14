import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import cookieParser from 'cookie-parser';
import { ApolloContext } from './typings';
import { buildFederatedSchema } from '@apollo/federation';
import typeDefs from './graphql/typeDefs';
import { PrismaClient, Environment } from '@prisma/client';

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
          resolvers: {
            Query: {
              async environments() {
                const environments = await prisma.environment.findMany();

                return environments;
              },
            },
            Environment: {
              async __resolveReference(environment: Environment) {
                const desiredEnvironment = await prisma.environment.findOne({
                  where: { id: environment.id },
                });

                return desiredEnvironment;
              },
            },
          },
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
