import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import { Strategy as FacebookStrategy } from 'passport-facebook';

export const GoogleStrategyObj = new GoogleStrategy(
  {
    clientID:
      '697747522167-8f3eobskkb8pm2pk8kft37tarl1nmcqb.apps.googleusercontent.com',
    clientSecret: process.env.SECRET_GOOGLE as string,
    callbackURL: 'http://localhost:5000/auth/google/callback',
  },
  (_, __, { provider, id, _json: { name, picture } }, done) => {
    done(null, { picture, provider, name, id });
  }
);

export const FacebookStrategyObj = new FacebookStrategy(
  {
    clientID: '227758985208227',
    clientSecret: process.env.SECRET_FACEBOOK as string,
    callbackURL: 'http://localhost:5000/auth/facebook/callback',
  },
  function (accessToken, refreshToken, profile, done) {
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);
    //TODO send this message only if the code before not fails
    done(null);
  }
);
