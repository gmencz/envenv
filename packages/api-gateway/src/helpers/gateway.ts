import { Express } from 'express';
import { ApolloGateway } from '@apollo/gateway';
import GatewayDataSource from '../datasources/GatewayDataSource';
import { ApolloServer } from 'apollo-server-express';
import { GatewayContext } from '../typings';

export default function initGateway(app: Express): ApolloServer {
  const gateway = new ApolloGateway({
    buildService({ url }): GatewayDataSource {
      return new GatewayDataSource({ url });
    },
  });

  const server = new ApolloServer({
    gateway,
    subscriptions: false,
    engine: {
      apiKey: process.env.APOLLO_KEY,
      graphVariant: process.env.APOLLO_GRAPH_VARIANT,
    },
    context: ({ req, res }: GatewayContext): GatewayContext => ({ req, res }),
  });
  console.log(`Loaded Envenv graph from AGM ✔️`);

  server.applyMiddleware({ app });
  return server;
}
