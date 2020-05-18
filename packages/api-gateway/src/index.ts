import { ApolloGateway } from '@apollo/gateway';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import cookieParser from 'cookie-parser';
import GatewayDataSource from './datasources/GatewayDataSource';
import { GatewayContext } from './typings';

const gateway = new ApolloGateway({
  buildService({ url }): GatewayDataSource {
    return new GatewayDataSource({ url });
  },
});

try {
  const app = express();
  app.use(cookieParser());

  const server = new ApolloServer({
    gateway,
    subscriptions: false,
    engine: {
      apiKey: process.env.APOLLO_KEY,
    },
    context: ({ req, res }: GatewayContext): GatewayContext => ({ req, res }),
  });

  server.applyMiddleware({ app });

  const PORT = process.env.API_GATEWAY_PORT;

  app.listen(PORT, () => {
    console.log(`API Gateway listening on http://localhost:${PORT}/`);
  });
} catch (error) {
  console.error(error);
}
