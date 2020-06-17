import { Express } from 'express';
import depthLimit from 'graphql-depth-limit';
import { ApolloGateway } from '@apollo/gateway';
import AuthenticatedDataSource from '../datasources/AuthenticatedDataSource';
import { ApolloServer } from 'apollo-server-express';
import { GatewayContext } from '../typings';

export default function initGateway(app: Express): ApolloServer {
  const gateway = new ApolloGateway({
    buildService({ url }): AuthenticatedDataSource {
      return new AuthenticatedDataSource({ url });
    },
  });

  const server = new ApolloServer({
    gateway,
    subscriptions: false,
    engine: {
      apiKey: process.env.APOLLO_KEY,
      graphVariant: process.env.APOLLO_GRAPH_VARIANT,
    },
    validationRules: [depthLimit(10)],
    context: ({ req, res }: GatewayContext): GatewayContext => ({ req, res }),
  });
  console.log(`Loaded Envenv graph from AGM ✔️`);

  server.applyMiddleware({
    app,
    cors: {
      origin:
        process.env.NODE_ENV === 'production'
          ? 'https://envenv.es'
          : 'http://localhost:3000',
      credentials: true,
    },
  });
  return server;
}
