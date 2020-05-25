import { ApolloError } from 'apollo-server-express';
import { verify } from 'jsonwebtoken';
import { reach } from 'yup';
import { createUserSchema } from '../../../validation/createUser';
import { compare, hash } from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { ResetPasswordResult, MutationResolvers } from '../../generated';
import {
  getCachedUser,
  cacheUser,
  evictCachedUser,
} from '../../../helpers/cache/user';

const updateUserPassword = async (
  prisma: PrismaClient,
  currentSuggestedPassword: string,
  currentValidPassword: string,
  newPassword: string,
  userId: string
): Promise<ResetPasswordResult> => {
  await reach(createUserSchema, 'password').validate(newPassword);
  const validCurrentPassword = await compare(
    currentSuggestedPassword,
    currentValidPassword
  );

  if (!validCurrentPassword) {
    return {
      __typename: 'PasswordsDontMatch',
      message: 'Your current password does not match the one you provided',
    };
  }

  await evictCachedUser(userId);

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      password: await hash(newPassword, 12),
      lastPasswordChange: new Date(),
    },
  });

  await cacheUser(updatedUser);

  return {
    __typename: 'User',
    email: updatedUser.email,
    id: updatedUser.id,
    name: updatedUser.name,
    password: updatedUser.password,
    provider: updatedUser.provider as any,
    role: updatedUser.role as any,
    username: updatedUser.username,
    picture: updatedUser.picture,
    lastPasswordChange: updatedUser.lastPasswordChange,
  };
};

const resetPassword: MutationResolvers['resetPassword'] = async (
  _,
  { data },
  { prisma }
): Promise<ResetPasswordResult> => {
  try {
    const decodedToken = verify(
      data.token,
      process.env.PASSWORD_RESET_SECRET!
    ) as { userId: string; lastPasswordChange: Date | null };

    let user = await getCachedUser(decodedToken.userId);

    if (!user) {
      user = await prisma.user.findOne({
        where: { id: decodedToken.userId },
      });
    }

    if (!user) {
      return {
        __typename: 'InvalidOrExpiredToken',
        message:
          'The token/link to reset your password is invalid, request another password reset if you wish to change your password',
      };
    }

    const wantsTheSamePassword = await compare(data.newPassword, user.password);

    if (wantsTheSamePassword) {
      return {
        __typename: 'WantsSamePassword',
        message:
          "Can't change password to your current password, please choose a new/different password than your current one",
      };
    }

    if (
      decodedToken.lastPasswordChange === null &&
      user.lastPasswordChange === null
    ) {
      const result = await updateUserPassword(
        prisma,
        data.currentPassword,
        user.password,
        data.newPassword,
        user.id
      );
      return result;
    }

    if (user.lastPasswordChange instanceof Date) {
      const usableTokenDate = new Date(decodedToken.lastPasswordChange as any);
      if (usableTokenDate.getTime() !== user.lastPasswordChange.getTime()) {
        return {
          __typename: 'InvalidOrExpiredToken',
          message:
            'The token/link to reset your password is invalid, request another password reset if you wish to change your password',
        };
      }

      const result = await updateUserPassword(
        prisma,
        data.currentPassword,
        user.password,
        data.newPassword,
        user.id
      );
      return result;
    }

    return {
      __typename: 'InvalidOrExpiredToken',
      message:
        'The token/link to reset your password is invalid, request another password reset if you wish to change your password',
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
        message:
          'The token/link to reset your password is invalid, request another password reset if you wish to change your password',
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

export default resetPassword;
