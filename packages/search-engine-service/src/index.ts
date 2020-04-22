import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { buildFederatedSchema } from './helpers/buildFederatedSchema';
import SearchResolver from './resolvers/Search';
import Search, { resolveSearchReference } from './entities/Search';

(async (): Promise<void> => {
  const app = express();

  const schema = await buildFederatedSchema(
    {
      resolvers: [SearchResolver],
      orphanedTypes: [Search],
    },
    {
      User: { __resolveReference: resolveSearchReference },
    }
  );

  const server = new ApolloServer({
    schema,
    tracing: false,
    playground: true,
    context: ({
      req,
      res,
    }: {
      req: Request;
      res: Response;
    }): { req: Request; res: Response } => ({
      req,
      res,
    }),
  });

  server.applyMiddleware({ app });

  app.listen(process.env.SERVICE_PORT, () => {
    console.log(
      `Search engine service listening on http://localhost:${process.env.SERVICE_PORT}/`
    );
  });
})();
