import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import { Strategy as FacebookStrategy } from 'passport-facebook';

export const GoogleStrategyObj = new GoogleStrategy(
  {
    clientID:
      '697747522167-8f3eobskkb8pm2pk8kft37tarl1nmcqb.apps.googleusercontent.com',
    clientSecret: process.env.SECRET_GOOGLE,
    callbackURL: 'http://localhost:5000/auth/google/callback',
  },
  function (accessToken, refreshToken, profile, done) {
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);
    done();
  }
);

export const FacebookStrategyObj = new FacebookStrategy(
  {
    clientID: '227758985208227',
    clientSecret: process.env.SECRET_FACEBOOK,
    callbackURL: 'http://localhost:5000/auth/facebook/callback',
  },
  function (accessToken, refreshToken, profile, done) {
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);
    done();
  }
);