import { Strategy as GithubStrategy, Profile } from 'passport-github2';
import { Request, Response } from 'express';
import getSession from '../../helpers/getSession';
import redisClient from '../../helpers/redisClient';
import { AccountProvider } from '../../graphql/generated';
import { PrismaClient } from '@prisma/client';
import createSession from '../../helpers/createSession';
import { generate } from 'generate-password';
import { hash } from 'bcryptjs';
import addAtToUsername from '../../helpers/addAtToUsername';
import { getCachedUser, cacheUser } from '../../helpers/cache/user';
import Encryptor from 'cryptr';
import { addYears } from 'date-fns';

export const githubStrategy = new GithubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID!,
    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    callbackURL: process.env.GITHUB_CALLBACK_URL!,
    scope: ['user:email'],
  },
  (
    _: any,
    __: any,
    { id, provider, emails, displayName, username, photos }: Profile,
    done: any
  ) => {
    const picture = photos ? photos[0]?.value : null;
    const email = emails ? emails[0]?.value : null;

    done(null, {
      picture,
      provider: provider.toUpperCase(),
      name: displayName,
      id,
      email,
      username,
    });
  }
);

const prisma = new PrismaClient();
export const callbackGithubAuth = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { state } = req.query;

    if (!state) {
      // User is trying to find a vulnerability or something similar so stop the oauth flow.
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
        return res.redirect(
          process.env.NODE_ENV === 'production'
            ? 'https://envenv.com/'
            : 'http://localhost:8080/'
        );
      }
    }

    const { id, name, provider, picture, email, username } = req.user as {
      id: string;
      name: string;
      provider: string;
      picture: string | null;
      email: string | null;
      username: string;
    };

    let user = await getCachedUser(id);
    let comesFromCache = true;
    if (!user) {
      comesFromCache = false;
      user = await prisma.user.findOne({ where: { id } });
    }

    console.log(user);

    if (operation === 'login') {
      // Check if the user has an account or not
      // Yes? redirect to route where the login will be automated
      // No? redirect to route where the client will display an error of no acc with that github acc.
      if (user) {
        const newSession = await createSession(user.id, redisClient);

        res.cookie('SessionID', newSession.sessionId, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          expires: addYears(Date.now(), 1),
          sameSite: 'strict',
        });

        if (!comesFromCache) {
          await cacheUser(user);
        }

        // redirect to route on the client which will make a graphql
        // request to a mutation which will automate the login
        return res.redirect(
          process.env.NODE_ENV === 'production'
            ? `https://envenv.com/auth/flow/success?csrfToken=${newSession.csrfToken}`
            : `http://localhost:8080/auth/flow/success?csrfToken=${newSession.csrfToken}`
        );
      }

      if (!user) {
        return res.redirect(
          process.env.NODE_ENV === 'production'
            ? `https://envenv.com/auth/flow/error?reason=notRegistered`
            : `http://localhost:8080/auth/flow/error?reason=notRegistered`
        );
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
      if (user) {
        const newSession = await createSession(user.id, redisClient);

        res.cookie('SessionID', newSession.sessionId, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          expires: addYears(Date.now(), 1),
          sameSite: 'strict',
        });

        if (!comesFromCache) {
          await cacheUser(user);
        }
        // redirect to route on the client which will make a graphql
        // request to a mutation which will automate the login
        return res.redirect(
          process.env.NODE_ENV === 'production'
            ? `https://envenv.com/auth/flow/success?csrfToken=${newSession.csrfToken}`
            : `http://localhost:8080/auth/flow/success?csrfToken=${newSession.csrfToken}`
        );
      }

      if (!user) {
        // Check if username/email are taken
        const takenUsername = await prisma.user.findOne({
          where: { username: addAtToUsername(username) },
        });

        const takenEmail = await prisma.user.findOne({
          where: { email },
        });

        const duplicateFields = [];
        const userData = { id, name, provider, picture, email, username };

        if (takenUsername) {
          duplicateFields.push('username');
          delete userData.username;
        }

        if (takenEmail) {
          duplicateFields.push('email');
          delete userData.email;
        }

        if (duplicateFields.length > 0) {
          const consumableDuplicateFields = duplicateFields.join(',');

          const encryptedUserData = new Encryptor(
            process.env.NEW_USER_DATA_SECRET!
          ).encrypt(JSON.stringify({ ...userData }));

          res.cookie('NewUserData', encryptedUserData, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            expires: addYears(Date.now(), 1),
            sameSite: 'strict',
          });

          return res.redirect(
            process.env.NODE_ENV === 'production'
              ? `https://envenv.com/auth/flow/success/lastStep?fill=${consumableDuplicateFields}`
              : `http://localhost:8080/auth/flow/success/lastStep?fill=${consumableDuplicateFields}`
          );
        }

        const password = await hash(
          generate({ length: 19, symbols: true, numbers: true }),
          12
        );

        const newUser = await prisma.user.create({
          data: {
            id,
            name,
            username: addAtToUsername(username),
            email,
            picture,
            provider: provider as AccountProvider,
            password,
          },
        });

        const newSession = await createSession(newUser.id, redisClient);

        res.cookie('SessionID', newSession.sessionId, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          expires: addYears(Date.now(), 1),
          sameSite: 'strict',
        });

        await cacheUser(newUser);

        return res.redirect(
          process.env.NODE_ENV === 'production'
            ? `https://envenv.com/auth/flow/success?csrfToken=${newSession.csrfToken}`
            : `http://localhost:8080/auth/flow/success?csrfToken=${newSession.csrfToken}`
        );
      }
    }

    return res.redirect(
      process.env.NODE_ENV === 'production'
        ? 'https://envenv.com/auth/flow/error?reason=unknown'
        : 'http://localhost:8080/auth/flow/error?reason=unknown'
    );
  } catch (error) {
    return res.redirect(
      process.env.NODE_ENV === 'production'
        ? 'https://envenv.com/auth/flow/error?reason=unknown'
        : 'http://localhost:8080/auth/flow/error?reason=unknown'
    );
  } finally {
    await prisma.disconnect();
  }
};
