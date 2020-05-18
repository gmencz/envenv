import { ApolloServer, gql } from 'apollo-server-express';
import express from 'express';
import cookieParser from 'cookie-parser';
import { ApolloContext } from './typings';
import { buildFederatedSchema } from '@apollo/federation';
import { PrismaClient } from '@prisma/client';
import resolvers from './graphql/resolvers';
import { importSchema } from 'graphql-import';
import chalk from 'chalk';

const prisma = new PrismaClient();
try {
  const app = express();
  app.use(cookieParser());
  app.use(express.json());

  const typeDefs = gql(importSchema(`${__dirname}/graphql/schema.graphql`));

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
    engine: false,
  });

  server.applyMiddleware({ app });

  const PORT = process.env.SERVICE_PORT;

  app.listen(PORT, () => {
    console.log(
      `
  Environments GraphQL service is up and running! 

  - Locally (accessible via your browser): ✔️
    http://localhost:${PORT}/graphql 

  - Inside Docker network: ✔️
    ${process.env.GRAPHQL_ENDPOINT} 
    `
    );
  });
} catch (error) {
  console.error(error);
}
