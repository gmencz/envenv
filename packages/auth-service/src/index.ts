import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { rateLimiter } from './middlewares/rateLimit';
import helmet from 'helmet';
import passport from 'passport';
import { GoogleStrategyObj } from './middlewares/passportStrategies';
import { scopeFn, callbackGoogleAuth } from './controllers/auth/google';
import cookieParser from 'cookie-parser';
import typeDefs from './graphql/typeDefs';
import { buildFederatedSchema } from '@apollo/federation';
import { ApolloContext } from './types';

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

  const server = new ApolloServer({
    schema: buildFederatedSchema([
      {
        typeDefs,
        resolvers: {
          Query: {
            helloAuth() {
              return 'hello auth';
            },
          },
        },
      },
    ]),
    context: ({ req, res }): ApolloContext => ({
      req,
      res,
      user: null,
    }),
  });
  server.applyMiddleware({ app });

  app.listen(process.env.SERVICE_PORT, function () {
    console.log(
      `Auth service listening on http://localhost:${process.env.SERVICE_PORT}/`
    );
  });
})();
