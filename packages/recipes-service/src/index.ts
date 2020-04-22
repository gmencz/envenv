import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { buildFederatedSchema } from './helpers/buildFederatedSchema';
import Recipe, { resolveRecipeReference } from './entities/Recipe';
import RecipeResolver from './resolvers/Recipe';

(async () => {
  const app = express();

  const schema = await buildFederatedSchema(
    {
      resolvers: [RecipeResolver],
      orphanedTypes: [Recipe],
    },
    {
      Recipe: { __resolveReference: resolveRecipeReference },
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
      `Recipes service listening on http://localhost:${process.env.SERVICE_PORT}/`
    );
  });
})();
