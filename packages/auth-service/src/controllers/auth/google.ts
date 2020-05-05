import passport from 'passport';
import { Request, Response } from 'express';
import { request } from 'graphql-request';

export const scopeFn = () =>
  passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/plus.login'],
  });

export const callbackGoogleAuth = async (
  req: Request,
  res: Response
): Promise<Response<any> | void> => {
  try {
    const query = `
      query checkExternalProviderUserAvailability($providerUserId: String!) {
        checkExternalProviderUserAvailability(providerUserId: $providerUserId)
      }
    `;

    const { id } = req.user as {
      id: string;
      picture: string;
      provider: string;
      name: string;
    };

    await request('http://users-service:5005/graphql', query, {
      providerUserId: id,
    });

    res.cookie('NewUserData', { ...req.user }, { httpOnly: true });
    /* 
      Redirect to route where the user will fill out 
      needed information like their username, after doing that
      we can create the user but this step is needed.
    */
    res.redirect(
      process.env.NODE_ENV === 'production'
        ? '/auth/signup/lastStep'
        : 'http://localhost:8080/auth/signup/lastStep'
    );
  } catch (error) {
    // Check if the error comes from our graphql request
    if (!error?.response.data && error?.request) {
      console.log(error);
      res.redirect(
        process.env.NODE_ENV === 'production'
          ? '/auth/signup/error/googleAccountExists'
          : 'http://localhost:8080/auth/signup/error/googleAccountExists'
      );
    }

    res.redirect(
      process.env.NODE_ENV === 'production'
        ? '/auth/signup/error/googleAccountUnknownError'
        : 'http://localhost:8080/auth/signup/error/googleAccountUnknownError'
    );
  }
};
