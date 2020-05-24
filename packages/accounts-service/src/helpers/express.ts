import express, { json as bodyParser, Express } from 'express';
import { Server } from 'http';
import cookieParser from 'cookie-parser';
import { default as cookieNormalizer } from './normalizeCookies';
import passport from 'passport';
import { githubStrategy, callbackGithubAuth } from '../controllers/auth/github';

export default function initExpress(): Express {
  const app = express();
  app.use(cookieParser());
  app.use(bodyParser());
  app.use(cookieNormalizer);

  passport.use(githubStrategy);
  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/auth/github', (req, res, next) => {
    // Find out if the user's purpose is to log in or sign up.
    const { operation } = req.query;
    const state = operation
      ? Buffer.from(JSON.stringify({ operation })).toString('base64')
      : undefined;

    const authenticator = passport.authenticate('github', {
      state,
    });

    authenticator(req, res, next);
  });

  app.get(
    '/auth/github/callback',
    passport.authenticate('github', {
      failureRedirect:
        process.env.NODE_ENV === 'production'
          ? 'https://envenv.com/auth/flow/error?reason=unknown'
          : 'http://localhost:8080/auth/flow/error?reason=unknown',
    }),
    callbackGithubAuth
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