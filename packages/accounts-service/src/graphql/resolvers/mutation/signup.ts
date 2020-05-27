import { ApolloError } from 'apollo-server-express';
import { createUserSchema } from '../../../validation/createUser';
import createSession from '../../../helpers/createSession';
import redisClient from '../../../helpers/redisClient';
import { hash } from 'bcryptjs';
import addAtToUsername from '../../../helpers/addAtToUsername';
import { MutationResolvers, SignupResult } from '../../generated';
import { cacheUser } from '../../../helpers/cache/user';

const signup: MutationResolvers['signup'] = async (
  _,
  { data },
  { prisma, res }
): Promise<SignupResult> => {
  try {
    await createUserSchema.validate({ ...data });

    const isUsernameTaken = await prisma.user.findOne({
      where: {
        username: data.username.startsWith('@')
          ? data.username
          : `@${data.username}`,
      },
      select: { id: true },
    });

    if (isUsernameTaken) {
      return {
        __typename: 'TakenUsernameOrEmail',
        message: 'That username is taken, please choose a different one',
      };
    }

    const isEmailTaken = await prisma.user.findOne({
      where: { email: data.email },
      select: { id: true },
    });

    if (isEmailTaken) {
      return {
        __typename: 'TakenUsernameOrEmail',
        message: 'That email is taken, please choose a different one',
      };
    }

    const password = await hash(data.password, 12);
    const username = addAtToUsername(data.username);

    const newUser = await prisma.user.create({
      data: { ...data, password, username },
    });

    const newSession = await createSession(newUser.id, redisClient);

    res.cookie('SessionID', newSession.sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 31556952000,
      sameSite: 'strict',
    });

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

    throw new ApolloError(
      `Something went wrong on our side, we're working on it!`,
      '500',
      {
        errorCode: 'server_error',
      }
    );
  }
};

export default signup;
