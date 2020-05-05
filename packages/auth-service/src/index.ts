import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import { buildFederatedSchema } from './helpers/buildFederatedSchema';
import AuthResolver from './resolvers/Auth';
import express from 'express';
import { rateLimiter } from './middlewares/rateLimit';
import helmet from 'helmet';
import passport from 'passport';
import { GoogleStrategyObj } from './middlewares/passportStrategies';
import { scopeFn, callbackGoogleAuth } from './controllers/auth/google';
import cookieParser from 'cookie-parser';

//TODO integrate passport callbacks with Apollo

(async (): Promise<void> => {
  const app = express();

  // Express middlewares
  app.use(helmet());
  app.use(express.json());
  app.use(rateLimiter);
  app.use(cookieParser());

  // Passport middlewares
  passport.use(GoogleStrategyObj);
  app.use(passport.initialize());
  app.use(passport.session());

  // App routes
  app.get('/auth/google', scopeFn());
  app.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    callbackGoogleAuth
  );

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

  const schema = await buildFederatedSchema(
    {
      resolvers: [AuthResolver],
      orphanedTypes: [],
    }
    // {
    //   Auth: { __resolveReference: resolveAuthReference },
    // }
  );

  const server = new ApolloServer({
    schema,
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

  app.listen(process.env.SERVICE_PORT, function () {
    console.log(
      `Auth service listening on http://localhost:${process.env.SERVICE_PORT}/`
    );
  });
})();
