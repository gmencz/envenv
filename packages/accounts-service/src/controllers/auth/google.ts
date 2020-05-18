import passport from 'passport';
import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import request from 'graphql-request';
import { UserResult } from '../../graphql/generated';

export const GoogleStrategyObj = new GoogleStrategy(
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

    const { user: userResult } = data as { user: UserResult };

    if (userResult.__typename === 'User') {
      res.cookie('TemporaryUserId', id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      });

      // redirect to route on the client which will make a graphql
      // request to a mutation which will automate the login
      return res.redirect(
        process.env.NODE_ENV === 'production'
          ? 'https://envenv.com/auth/automateLoginProcess'
          : 'http://localhost:8080/auth/automateLoginProcess'
      );
    }

    if (userResult.__typename === 'UserNotFound') {
      const signedNewUserData = await new Promise((resolve, reject) => {
        sign(
          { ...req.user },
          process.env.SESSION_INFO_SECRET!,
          {
            expiresIn: '1m',
          },
          (error, data) => {
            if (error) {
              reject(error);
            }

            resolve(data);
          }
        );
      });

      res.cookie('NewUserData', signedNewUserData, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      });
      /* 
        Redirect to route where the user will fill out 
        needed information like their username, after doing that
        we can create the user but this step is needed.
      */
      return res.redirect(
        process.env.NODE_ENV === 'production'
          ? 'https://envenv.com/auth/signup/lastStep'
          : 'http://localhost:8080/auth/signup/lastStep'
      );
    }

    return res.redirect(
      process.env.NODE_ENV === 'production'
        ? 'https://envenv.com/auth/signup/error/invalidGoogleResponse'
        : 'http://localhost:8080/auth/signup/error/invalidGoogleResponse'
    );
  } catch (error) {
    return res.redirect(
      process.env.NODE_ENV === 'production'
        ? 'https://envenv.com/auth/signup/error/googleAccountUnknownError'
        : 'http://localhost:8080/auth/signup/error/googleAccountUnknownError'
    );
  }
};
