import { ApolloError } from 'apollo-server-express';
import { reach } from 'yup';
import addAtToUsername from '../../../helpers/addAtToUsername';
import { compare } from 'bcryptjs';
import {
  InvalidCredentials,
  MutationResolvers,
  LoginResult,
} from '../../generated';
import createSession from '../../../helpers/createSession';
import redisClient from '../../../helpers/redisClient';
import getSession from '../../../helpers/getSession';
import { newUserSchema } from '@envenv/common';

const login: MutationResolvers['login'] = async (
  _,
  { username, password },
  { prisma, res, req }
): Promise<LoginResult> => {
  try {
    await reach(newUserSchema, 'username').validate(username);
    await reach(newUserSchema, 'password').validate(password);

    const consumableUsername = addAtToUsername(username);

    const usersMatchingCredentials = await prisma.user.findMany({
      where: {
        AND: [
          {
            username: consumableUsername,
          },
          {
            provider: 'NONE',
          },
        ],
      },
      take: 1,
    });

    const invalidCredentialsResponse: InvalidCredentials = {
      __typename: 'InvalidCredentials',
      message:
        "Either the username or the password is invalid, make sure you didn't make any typos",
    };

    if (usersMatchingCredentials.length === 0) {
      return invalidCredentialsResponse;
    }

    const user = usersMatchingCredentials[0];
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      return invalidCredentialsResponse;
    }

    const newSession = await createSession(user.id, redisClient);

    if (req.cookies.SessionID) {
      const pastSession = await getSession(req.cookies.SessionID, redisClient);

      if (pastSession) {
        await redisClient.del(`session_${pastSession.sessionId}`);
      }
    }

    res.cookie('SessionID', newSession.sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 31556952000,
      sameSite: 'strict',
    });

    return {
      __typename: 'SuccessfulLogin',
      user: {
        email: user.email,
        id: user.id,
        name: user.name,
        password: user.password,
        provider: user.provider as any,
        role: user.role as any,
        username: user.username,
        lastPasswordChange: user.lastPasswordChange,
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

export default login;
