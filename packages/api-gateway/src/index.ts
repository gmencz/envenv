import 'reflect-metadata';
import { ApolloGateway, RemoteGraphQLDataSource } from '@apollo/gateway';
import { ApolloServer } from 'apollo-server-express';
import { GatewayService } from './types';
import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import parseCookies from './helpers/parseCookies';

class CustomDataSource extends RemoteGraphQLDataSource {
  willSendRequest({ request, context }): void {
    if (context && context.req && context.req.cookies) {
      request.http.headers.set('Cookie', JSON.stringify(context.req.cookies));
    }
  }

  didReceiveResponse({ response, context }): typeof response {
    const rawCookies = response.http.headers.get('set-cookie') as string | null;

    if (rawCookies) {
      const cookies = parseCookies(rawCookies);
      cookies.forEach(({ cookieName, cookieValue, options }) => {
        if (context && context.res) {
          context.res.cookie(cookieName, cookieValue, options);
        }
      });
    }

    return response;
  }
}

async function initGateway(): Promise<void> {
  try {
    const app = express();
    app.use(cookieParser());

    const serviceList: GatewayService[] = [
      {
        name: 'auth-service',
        url: process.env.AUTH_SERVICE_URL as string,
      },
      {
        name: 'users-service',
        url: process.env.USERS_SERVICE_URL as string,
      },
      {
        name: 'environments-service',
        url: process.env.ENVIRONMENTS_SERVICE_URL as string,
      },
    ];

    /*
      Create a new instance of ApolloGateway and wait until loaded
    */
    const gateway = new ApolloGateway({
      serviceList,
      buildService({ url }): CustomDataSource {
        return new CustomDataSource({ url });
      },
    });
    const { schema, executor } = await gateway.load();

    /*
      Create our ApolloServer and pass in our gateway's information
    */
    const server = new ApolloServer({
      schema,
      executor,
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

    /*
      Expose our Gateway so we can make requests to it
    */
    app.listen(process.env.API_GATEWAY_PORT, () => {
      console.log(
        `API Gateway listening on http://localhost:${process.env.API_GATEWAY_PORT}/`
      );
    });
  } catch (error) {
    console.error(error);
    process.exit(1); // We do this so our container tries to restart
  }
}

initGateway();
