import express, { Express } from 'express';
import cookieParser from 'cookie-parser';
import { Server } from 'http';

export default function initExpress(): Express {
  const app = express();
  app.use(cookieParser());

  return app;
}

export function start(app: Express): Server {
  return app.listen(process.env.API_GATEWAY_PORT, () => {
    console.log(
      `
  API gateway is up and running! 

  - Locally (accessible via your browser): ✔️
    http://localhost:${process.env.API_GATEWAY_PORT}/graphql 

  - Inside Docker network: ✔️
    ${process.env.GRAPHQL_ENDPOINT}
  
  
  ⚠️   Keep in mind the gateway might not be up to date so
  ⚠️   you shouldn't use it unless you're working on the client.
  ⚠️   If that isn't the case, use whatever service's endpoint
  ⚠️   you're working on. 
    `
    );
  });
}
