import { ApolloServer, gql } from 'apollo-server-express';
import express from 'express';
import cookieParser from 'cookie-parser';
import { buildFederatedSchema } from '@apollo/federation';
import passport from 'passport';
import { PrismaClient } from '@prisma/client';
import { importSchema } from 'graphql-import';
import {
  callbackGoogleAuth,
  scopeFn,
  GoogleStrategyObj,
} from './controllers/auth/google';
import resolvers from './graphql/resolvers';
import { ApolloContext } from './typings';
import normalizeCookies from './helpers/normalizeCookies';

const prisma = new PrismaClient();

try {
  const app = express();
  app.use(cookieParser());
  app.use(express.json());
  app.use(normalizeCookies);

  passport.use(GoogleStrategyObj);
  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/auth/google', (req, res, next) => {
    // Find out if the user's purpose is to log in or sign up.
    const { operation } = req.query;
    const state = operation
      ? Buffer.from(JSON.stringify({ operation })).toString('base64')
      : undefined;

    const authenticator = passport.authenticate('google', {
      scope: ['profile', 'email'],
      state,
    });

    authenticator(req, res, next);
  });

  app.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    callbackGoogleAuth
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  const typeDefs = gql(importSchema(`${__dirname}/graphql/schema.graphql`));

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
    console.log(
      `
  Accounts GraphQL service is up and running! 

  - Locally (accessible via your browser): ✔️
    http://localhost:${PORT}/graphql 

  - Inside Docker network: ✔️
    ${process.env.GRAPHQL_ENDPOINT} 
    `
    );
  });
} catch (error) {
  console.error(error);
}
