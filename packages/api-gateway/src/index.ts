// Entrypoint file for our API Gateway
import 'reflect-metadata';
import { ApolloGateway } from '@apollo/gateway';
import { ApolloServer } from 'apollo-server';
import { IGatewayService } from './types';

async function initGateway() {
  const serviceList: IGatewayService[] = [
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
  const gatewayServer = await server.listen({ port: 7000 });
  console.log(`
    API Gateway available at ${gatewayServer.url}
  `);
}

initGateway().catch(console.error);
