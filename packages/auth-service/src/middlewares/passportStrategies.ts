import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';

export const GoogleStrategyObj = new GoogleStrategy(
  {
    clientID:
      '697747522167-8f3eobskkb8pm2pk8kft37tarl1nmcqb.apps.googleusercontent.com',
    clientSecret: process.env.SECRET_GOOGLE as string,
    callbackURL: `${process.env.GOOGLE_CALLBACK_URL}/auth/google/callback`,
  },
  (_, __, { provider, id, _json: { name, picture } }, done) => {
    console.log('as');
    done(null, { picture, provider, name, id });
  }
);
