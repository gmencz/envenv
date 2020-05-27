import { ApolloError } from 'apollo-server-express';
import { reach } from 'yup';
import { createUserSchema } from '../../../validation/createUser';
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

const login: MutationResolvers['login'] = async (
  _,
  { username, password },
  { prisma, res, req }
): Promise<LoginResult> => {
  try {
    await reach(createUserSchema, 'username').validate(username);
    await reach(createUserSchema, 'password').validate(password);

    const consumableUsername = addAtToUsername(username);

    const user = await prisma.user.findOne({
      where: { username: consumableUsername },
    });

    const invalidCredentialsResponse: InvalidCredentials = {
      __typename: 'InvalidCredentials',
      message:
        "Either the username or the password is invalid, make sure you didn't make any typos",
    };

    if (!user) {
      return invalidCredentialsResponse;
    }

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

    throw new ApolloError(
      `Something went wrong on our side, we're working on it!`,
      '500',
      {
        errorCode: 'server_error',
      }
    );
  }
};

export default login;
