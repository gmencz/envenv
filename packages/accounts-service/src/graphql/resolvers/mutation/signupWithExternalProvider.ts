import { ApolloError } from 'apollo-server-express';
import { reach } from 'yup';
import { createUserSchema } from '../../../validation/createUser';
import { verify } from 'jsonwebtoken';
import {
  User,
  MutationResolvers,
  SkippedOAuthFlow,
  TakenUsernameOrEmail,
  SuccessfulSignup,
  InvalidDataFormat,
  InvalidOrExpiredToken,
  SignupWithExternalProviderResult,
} from '../../generated';
import { generate } from 'generate-password';
import { hash } from 'bcryptjs';
import addAtToUsername from '../../../helpers/addAtToUsername';
import createSession from '../../../helpers/createSession';
import redisClient from '../../../helpers/redisClient';
import { AccountProvider } from '@prisma/client';

const signupWithExternalProvider: MutationResolvers['signupWithExternalProvider'] = async (
  _,
  { username },
  { prisma, req, res }
): Promise<SignupWithExternalProviderResult> => {
  try {
    await reach(createUserSchema, 'username').validate(username);

    if (!req.cookies.NewUserData) {
      return {
        __typename: 'SkippedOAuthFlow',
        message:
          "Can't sign up with an external provider without going through the oauth flow",
      };
    }

    // Check graphql-codegen with federation again, we have to make it work, we just
    // can't be manually typing every single operation specially when our graph gets larger.
    const decodedUserData = await new Promise((resolve, reject) => {
      verify(
        req.cookies.NewUserData,
        process.env.SESSION_INFO_SECRET!,
        (error: any, sessionInfo: any) => {
          if (error) {
            reject(error);
          }

          resolve(sessionInfo);
        }
      );
    });

    const { picture, provider, name, id, email } = decodedUserData as Pick<
      User,
      'picture' | 'provider' | 'name' | 'id' | 'email'
    >;

    const isUsernameTaken = await prisma.user.findOne({
      where: { username: addAtToUsername(username) },
    });
    if (isUsernameTaken) {
      return {
        __typename: 'TakenUsernameOrEmail',
        message: 'That username is taken, please choose a different one',
      };
    }

    const password = await hash(
      generate({ length: 19, symbols: true, numbers: true }),
      12
    );

    const validUsername = addAtToUsername(username);

    const newUser = await prisma.user.create({
      data: {
        id,
        email,
        name,
        password,
        username: validUsername,
        picture,
        provider: provider.toUpperCase() as AccountProvider,
      },
    });

    const newSession = await createSession(newUser.id, redisClient);

    res.cookie('SessionID', newSession.sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: Number(process.env.SESSION_REDIS_EXPIRY!),
    });

    res.clearCookie('NewUserData');

    return {
      __typename: 'SuccessfulSignup',
      user: {
        email: newUser.email,
        id: newUser.id,
        name: newUser.name,
        password: newUser.password,
        provider: newUser.provider as any,
        role: newUser.role as any,
        username: newUser.username,
      },
      csrfToken: newSession.csrfToken,
    };
  } catch (error) {
    if (error.name === 'ValidationError') {
      return {
        __typename: 'InvalidDataFormat',
        message: error.message,
      };
    }

    if (
      error.name === 'TokenExpiredError' ||
      error.name === 'JsonWebTokenError' ||
      error.name === 'NotBeforeError'
    ) {
      return {
        __typename: 'InvalidOrExpiredToken',
        message: 'The time to sign up has expired or token was invalid',
      };
    }

    throw new ApolloError(
      `Something went wrong on our side, we're working on it!`,
      '500',
      {
        errorCode: 'server_error',
      }
    );
  }
};

export default signupWithExternalProvider;
