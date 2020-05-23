import passport from 'passport';
import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import request from 'graphql-request';
import { UserResult } from '../../graphql/generated';
import getSession from '../../helpers/getSession';
import redisClient from '../../helpers/redisClient';

export const googleStrategy = new GoogleStrategy(
  {
    clientID:
      '697747522167-8f3eobskkb8pm2pk8kft37tarl1nmcqb.apps.googleusercontent.com',
    clientSecret: process.env.SECRET_GOOGLE!,
    callbackURL: `${process.env.GOOGLE_CALLBACK_URL}/auth/google/callback`,
  },
  (_, __, { provider, id, _json: { name, picture, email } }, done) => {
    done(null, { picture, provider, name, id, email });
  }
);

export const scopeFn = (): any =>
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  });

export const callbackGoogleAuth = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { state } = req.query;

    if (!state) {
      // User is trying to find a vulnerability or something similar so stop the oauth flow.
      if (req.cookies.TemporaryUserID) {
        res.clearCookie('TemporaryUserID');
      }

      if (req.cookies.NewUserData) {
        res.clearCookie('NewUserData');
      }

      return res.redirect(
        process.env.NODE_ENV === 'production'
          ? 'https://envenv.com/auth/flow/error?reason=unknown'
          : 'http://localhost:8080/auth/flow/error?reason=unknown'
      );
    }

    const { operation } = JSON.parse(
      Buffer.from(state as string, 'base64').toString()
    );
    const possibleOperations = ['login', 'signup'];

    if (!possibleOperations.some(op => op === operation)) {
      // User is trying to find a vulnerability or something similar so stop the oauth flow.
      if (req.cookies.TemporaryUserID) {
        res.clearCookie('TemporaryUserID');
      }

      if (req.cookies.NewUserData) {
        res.clearCookie('NewUserData');
      }

      return res.redirect(
        process.env.NODE_ENV === 'production'
          ? 'https://envenv.com/auth/flow/error?reason=unknown'
          : 'http://localhost:8080/auth/flow/error?reason=unknown'
      );
    }

    // Find out if user is logged in or not
    // Yes? Redirect to application
    // No? Keep going with the oauth flow
    if (req.cookies.SessionID) {
      const session = await getSession(req.cookies.SessionID, redisClient);

      if (session) {
        if (req.cookies.TemporaryUserID) {
          res.clearCookie('TemporaryUserID');
        }

        if (req.cookies.NewUserData) {
          res.clearCookie('NewUserData');
        }

        return res.redirect(
          process.env.NODE_ENV === 'production'
            ? 'https://envenv.com/'
            : 'http://localhost:8080/'
        );
      }
    }

    const { id } = req.user as {
      id: string;
    };

    const data = await request(
      process.env.GRAPHQL_ENDPOINT!,
      `
      query GetUserById($id: String!) {
        user(id: $id) {
          __typename
        }
      } 
    `,
      {
        id,
      }
    );

    const { user: userResult } = data as {
      user: Pick<UserResult, '__typename'>;
    };

    if (operation === 'login') {
      // Check if the user has an account or not
      // Yes? redirect to route where the login will be automated
      // No? redirect to route where the client will display an error of no acc with that google acc.

      if (userResult.__typename === 'User') {
        const encodedId = Buffer.from(id).toString('base64');

        if (req.cookies.NewUserData) {
          res.clearCookie('NewUserData');
        }

        res.cookie('TemporaryUserID', encodedId, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
        });

        // redirect to route on the client which will make a graphql
        // request to a mutation which will automate the login
        return res.redirect(
          process.env.NODE_ENV === 'production'
            ? `https://envenv.com/auth/flow/lastStep?operation=login`
            : `http://localhost:8080/auth/flow/lastStep?operation=login`
        );
      }

      if (userResult.__typename === 'UserNotFound') {
        if (req.cookies.TemporaryUserID) {
          res.clearCookie('TemporaryUserID');
        }

        if (req.cookies.NewUserData) {
          res.clearCookie('NewUserData');
        }

        return res.redirect(
          process.env.NODE_ENV === 'production'
            ? `https://envenv.com/auth/flow/error?reason=notRegistered`
            : `http://localhost:8080/auth/flow/error?reason=notRegistered`
        );
      }

      if (req.cookies.TemporaryUserID) {
        res.clearCookie('TemporaryUserID');
      }

      if (req.cookies.NewUserData) {
        res.clearCookie('NewUserData');
      }

      return res.redirect(
        process.env.NODE_ENV === 'production'
          ? 'https://envenv.com/auth/flow/error?reason=unknown'
          : 'http://localhost:8080/auth/flow/error?reason=unknown'
      );
    }

    if (operation === 'signup') {
      // Check if the user has an account or not
      // Yes? redirect to route where the login will be automated
      // No? redirect to route where the client will provide the username and finish signing up
      if (userResult.__typename === 'User') {
        const encodedId = Buffer.from(id).toString('base64');

        if (req.cookies.NewUserData) {
          res.clearCookie('NewUserData');
        }

        res.cookie('TemporaryUserID', encodedId, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
        });

        // redirect to route on the client which will make a graphql
        // request to a mutation which will automate the login
        return res.redirect(
          process.env.NODE_ENV === 'production'
            ? `https://envenv.com/auth/flow/lastStep?operation=login`
            : `http://localhost:8080/auth/flow/lastStep?operation=login`
        );
      }

      if (userResult.__typename === 'UserNotFound') {
        const signedNewUserData = await new Promise((resolve, reject) => {
          sign(
            { ...req.user },
            process.env.SESSION_INFO_SECRET!,
            {
              expiresIn: '1y',
            },
            (error, data) => {
              if (error) {
                reject(error);
              }

              resolve(data);
            }
          );
        });

        if (req.cookies.TemporaryUserID) {
          res.clearCookie('TemporaryUserID');
        }

        res.cookie('NewUserData', signedNewUserData, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 31557600000,
        });

        return res.redirect(
          process.env.NODE_ENV === 'production'
            ? 'https://envenv.com/auth/flow/lastStep?operation=signup'
            : 'http://localhost:8080/auth/flow/lastStep?operation=signup'
        );
      }
    }

    if (req.cookies.TemporaryUserID) {
      res.clearCookie('TemporaryUserID');
    }

    if (req.cookies.NewUserData) {
      res.clearCookie('NewUserData');
    }

    return res.redirect(
      process.env.NODE_ENV === 'production'
        ? 'https://envenv.com/auth/flow/error?reason=unknown'
        : 'http://localhost:8080/auth/flow/error?reason=unknown'
    );
  } catch (error) {
    if (req.cookies.TemporaryUserID) {
      res.clearCookie('TemporaryUserID');
    }

    if (req.cookies.NewUserData) {
      res.clearCookie('NewUserData');
    }

    return res.redirect(
      process.env.NODE_ENV === 'production'
        ? 'https://envenv.com/auth/flow/error?reason=unknown'
        : 'http://localhost:8080/auth/flow/error?reason=unknown'
    );
  }
};
