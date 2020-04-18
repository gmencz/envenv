// Entrypoint file for our API Gateway
import 'reflect-metadata';
import { ApolloGateway } from '@apollo/gateway';
import { ApolloServer } from 'apollo-server';
import { GatewayService } from './types';

async function initGateway(): Promise<void> {
  try {
    const serviceList: GatewayService[] = [
      {
        name: 'auth-service',
        url: process.env.AUTH_SERVICE_URL as string,
      },
      {
        name: 'chat-service',
        url: process.env.CHAT_SERVICE_URL as string,
      },
      {
        name: 'logging-service',
        url: process.env.LOGGING_SERVICE_URL as string,
      },
      {
        name: 'recipes-service',
        url: process.env.RECIPES_SERVICE_URL as string,
      },
      {
        name: 'search-engine-service',
        url: process.env.SEARCH_ENGINE_SERVICE_URL as string,
      },
      {
        name: 'users-service',
        url: process.env.USERS_SERVICE_URL as string,
      },
    ];

    /*
      Create a new instance of ApolloGateway and wait until loaded
    */
    const gateway = new ApolloGateway({ serviceList });
    const { schema, executor } = await gateway.load();

    /*
      Create our ApolloServer and pass in our gateway's information
    */
    const server = new ApolloServer({
      schema,
      executor,
      tracing: false,
      playground: true,
    });

    /*
      Expose our Gateway so we can make requests to it
    */
    const gatewayServer = await server.listen({
      port: process.env.API_GATEWAY_PORT,
    });
    console.log(`
      API Gateway available at ${gatewayServer.url}
    `);
  } catch (error) {
    console.error(error);
    process.exit(1); // We do this so our container tries to restart
  }
}

initGateway();
