import { ApolloError } from 'apollo-server-express';
import { createUserSchema } from '../../../validation/createUser';
import createSession from '../../../helpers/createSession';
import redisClient from '../../../helpers/redisClient';
import { hash } from 'bcryptjs';
import addAtToUsername from '../../../helpers/addAtToUsername';
import { MutationResolvers, SignupResult } from '../../generated';
import { addYears } from 'date-fns';

const signup: MutationResolvers['signup'] = async (
  _,
  { data, provider },
  { prisma, res }
): Promise<SignupResult> => {
  try {
    await createUserSchema.validate({ ...data });
    const consumableUsername = addAtToUsername(data.username);

    const duplicateUsers = await prisma.user.findMany({
      where: {
        OR: [
          {
            username: consumableUsername,
          },
          {
            email: data.email,
          },
        ],
      },
      take: 1,
    });

    if (duplicateUsers.length > 0) {
      if (duplicateUsers[0].email === data.email) {
        return {
          __typename: 'TakenUsernameOrEmail',
          message: 'That email is taken, please choose a different one',
        };
      }

      if (duplicateUsers[0].username === consumableUsername) {
        return {
          __typename: 'TakenUsernameOrEmail',
          message: 'That username is taken, please choose a different one',
        };
      }
    }

    const password = await hash(data.password, 12);

    const newUser = await prisma.user.create({
      data: {
        ...data,
        password,
        username: consumableUsername,
        provider: provider ?? 'NONE',
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        id: data.id as string | undefined,
      },
    });

    const newSession = await createSession(newUser.id, redisClient);

    res.cookie('SessionID', newSession.sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: addYears(Date.now(), 1),
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

    return new ApolloError(
      `Something went wrong on our side, we're working on it!`,
      '500',
      {
        errorCode: 'server_error',
      }
    );
  }
};

export default signup;
