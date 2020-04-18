import { ApolloServer } from 'apollo-server';
import { buildFederatedSchema } from './helpers/buildFederatedSchema';
import Recipe, { resolveRecipeReference } from './entities/Recipe';
import RecipeResolver from './resolvers/Recipe';

(async () => {
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
  });

  const { url } = await server.listen({ port: process.env.SERVICE_PORT });
  console.log(`Recipes service listening on ${url}`);
})();
