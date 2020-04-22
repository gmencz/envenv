import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { buildFederatedSchema } from './helpers/buildFederatedSchema';
import Log, { resolveLogReference } from './entities/Log';
import LogResolver from './resolvers/Log';

(async (): Promise<void> => {
  const app = express();

  const schema = await buildFederatedSchema(
    {
      resolvers: [LogResolver],
      orphanedTypes: [Log],
    },
    {
      Log: { __resolveReference: resolveLogReference },
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
      `Logging service listening on http://localhost:${process.env.SERVICE_PORT}/`
    );
  });
})();
