import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import cookieParser from 'cookie-parser';
import { ApolloContext } from './typings';
import { buildFederatedSchema } from '@apollo/federation';
import typeDefs from './graphql/typeDefs';
import passport from 'passport';
import {
  callbackGoogleAuth,
  scopeFn,
  GoogleStrategyObj,
} from './controllers/auth/google';
import { PrismaClient } from '@prisma/client';
import resolvers from './graphql/resolvers';

const prisma = new PrismaClient();

(async (): Promise<void> => {
  try {
    const app = express();
    app.use(cookieParser());
    app.use(express.json());

    passport.use(GoogleStrategyObj);
    app.use(passport.initialize());
    app.use(passport.session());

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
          resolvers: resolvers as any,
        },
      ]),
      context: ({ req, res }: ApolloContext): ApolloContext => ({
        req,
        res,
        user: null,
        prisma,
      }),
    });

    server.applyMiddleware({ app });

    const PORT = process.env.SERVICE_PORT;
    app.listen(PORT, () => {
      console.log(`Accounts service listening on http://localhost:${PORT}/`);
    });
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.disconnect();
  }
})();
