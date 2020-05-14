import passport from 'passport';
import { Request, Response } from 'express';
import { request } from 'graphql-request';
import { sign } from 'jsonwebtoken';

import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';

export const GoogleStrategyObj = new GoogleStrategy(
  {
    clientID:
      '697747522167-8f3eobskkb8pm2pk8kft37tarl1nmcqb.apps.googleusercontent.com',
    clientSecret: process.env.SECRET_GOOGLE as string,
    callbackURL: `${process.env.GOOGLE_CALLBACK_URL}/auth/google/callback`,
  },
  (_, __, { provider, id, _json: { name, picture, email } }, done) => {
    done(null, { picture, provider, name, id, email });
  }
);

export const scopeFn = () =>
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  });

export const callbackGoogleAuth = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const checkUserQuery = `
      query queryUserById($userId: String!) {
        queryUser(by: id, byValue: $userId) {
          id
        }
      }
    `;

    const { id } = req.user as {
      id: string;
      picture: string;
      provider: string;
      name: string;
    };

    const checkUserResponse = await request(
      process.env.USERS_SERVICE_URL as string,
      checkUserQuery,
      {
        userId: id,
      }
    );

    const { queryUser: user } = checkUserResponse as { queryUser: User | null };

    if (user) {
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

    const signedNewUserData = await new Promise((resolve, reject) => {
      sign(
        { ...req.user },
        process.env.SESSION_INFO_SECRET as string,
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

    res.cookie('NewUserData', signedNewUserData, { httpOnly: true });
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
  } catch (error) {
    return res.redirect(
      process.env.NODE_ENV === 'production'
        ? 'https://envenv.com/auth/signup/error/googleAccountUnknownError'
        : 'http://localhost:8080/auth/signup/error/googleAccountUnknownError'
    );
  }
};
