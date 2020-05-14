import { ApolloGateway } from '@apollo/gateway';
import { ApolloServer } from 'apollo-server-express';
import { GatewayService } from './typings';
import express from 'express';
import cookieParser from 'cookie-parser';
import GatewayDataSource from './datasources/GatewayDataSource';
import { GatewayContext } from './typings';

const serviceList: GatewayService[] = [
  {
    name: 'accounts-service',
    url: process.env.ACCOUNTS_SERVICE_URL as string,
  },
  {
    name: 'environments-service',
    url: process.env.ENVIRONMENTS_SERVICE_URL as string,
  },
];

const gateway = new ApolloGateway({
  serviceList,
  buildService({ url }): GatewayDataSource {
    return new GatewayDataSource({ url });
  },
});

(async (): Promise<void> => {
  try {
    const app = express();
    app.use(cookieParser());

    const { executor, schema } = await gateway.load();

    const server = new ApolloServer({
      executor,
      schema,
      subscriptions: false,
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
})();
