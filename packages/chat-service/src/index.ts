import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import { buildFederatedSchema } from './helpers/buildFederatedSchema';
import Message, { resolveMessageReference } from './entities/Message';
import MessageResolver from './resolvers/Message';
import express from 'express';

(async () => {
  const app = express();

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
      `Chat service listening on http://localhost:${process.env.SERVICE_PORT}/`
    );
  });
})();
