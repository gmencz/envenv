import express, { json as bodyParser, Express } from 'express';
import { Server } from 'http';
import cookieParser from 'cookie-parser';
import { default as cookieNormalizer } from './normalizeCookies';
import passport from 'passport';
import { googleStrategy, callbackGoogleAuth } from '../controllers/auth/google';

export default function initExpress(): Express {
  const app = express();
  app.use(cookieParser());
  app.use(bodyParser());
  app.use(cookieNormalizer);

  passport.use(googleStrategy);
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

  return app;
}

export function start(app: Express): Server {
  return app.listen(process.env.SERVICE_PORT, () => {
    console.log(
      `
  Accounts GraphQL service is up and running! 

  - Locally (accessible via your browser): ✔️
    http://localhost:${process.env.SERVICE_PORT}/graphql 

  - Inside Docker network: ✔️
    ${process.env.GRAPHQL_ENDPOINT} 
    `
    );
  });
}
