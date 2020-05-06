import passport from 'passport';
import { Request, Response } from 'express';
import { request } from 'graphql-request';
import User from '../../entities/User';

export const scopeFn = () =>
  passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/plus.login'],
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
      'http://users-service:5005/graphql',
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
        maxAge: 60000,
      });

      // redirect to route on the client which will make a graphql
      // request to a mutation which will automate the login
      return res.redirect(
        process.env.NODE_ENV === 'production'
          ? '/auth/automateLoginProcess'
          : 'http://localhost:8080/auth/automateLoginProcess'
      );
    }

    res.cookie('NewUserData', { ...req.user }, { httpOnly: true });
    /* 
      Redirect to route where the user will fill out 
      needed information like their username, after doing that
      we can create the user but this step is needed.
    */
    return res.redirect(
      process.env.NODE_ENV === 'production'
        ? '/auth/signup/lastStep'
        : 'http://localhost:8080/auth/signup/lastStep'
    );
  } catch (error) {
    return res.redirect(
      process.env.NODE_ENV === 'production'
        ? '/auth/signup/error/googleAccountUnknownError'
        : 'http://localhost:8080/auth/signup/error/googleAccountUnknownError'
    );
  }
};
