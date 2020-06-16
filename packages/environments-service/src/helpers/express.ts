import express, { Express, json as bodyParser } from 'express';
import cookieParser from 'cookie-parser';
import { default as cookieNormalizer } from './normalizeCookies';
import { Server } from 'http';

export default function initExpress(): Express {
  const app = express();
  app.use(cookieParser());
  app.use(bodyParser());
  app.use(cookieNormalizer);

  return app;
}

export function start(app: Express): Server {
  const PORT = process.env.SERVICE_PORT || 5001;

  return app.listen(PORT, () => {
    console.log(
      `
  Environments GraphQL service is up and running! 

  - Locally (accessible via your browser): ✔️
    http://localhost:${PORT}/graphql 
    `
    );
  });
}
