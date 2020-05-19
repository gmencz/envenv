import { MutationOperations } from '.';
import { ApolloError } from 'apollo-server-express';
import { verify } from 'jsonwebtoken';
import { reach } from 'yup';
import { createUserSchema } from '../../../validation/createUser';
import { compare, hash } from 'bcryptjs';

const resetPassword: MutationOperations['resetPassword'] = async (
  _,
  { data },
  { prisma }
) => {
  try {
    const decodedToken = verify(
      data.token,
      process.env.PASSWORD_RESET_SECRET!
    ) as { userId: string; lastPasswordChange: string | null };

    const user = await prisma.user.findOne({
      where: { id: decodedToken.userId },
    });
    if (!user) {
      return {
        __typename: 'InvalidOrExpiredToken',
        message:
          'The token/link to reset your password is invalid, request another password reset if you wish to change your password',
      };
    }

    // Conditions to check:
    // - If one is a date but the other is null, throw
    // - If they are not equal, throw
    if (!decodedToken.lastPasswordChange && user.lastPasswordChange) {
      return {
        __typename: 'InvalidOrExpiredToken',
        message:
          'The token/link to reset your password is invalid, request another password reset if you wish to change your password',
      };
    }

    // If both are null, reset password
    if (decodedToken.lastPasswordChange === user.lastPasswordChange) {
      await reach(createUserSchema, 'password').validate(data.newPassword);
      const validCurrentPassword = await compare(
        data.currentPassword,
        user.password
      );

      if (!validCurrentPassword) {
        return {
          __typename: 'PasswordsDontMatch',
          message: 'Your current password does not match the one you provided',
        };
      }

      await prisma.user.update({
        where: { id: user.id },
        data: {
          password: await hash(data.newPassword, 12),
        },
      });

      await prisma.user.update({
        where: { id: user.id },
        data: {
          lastPasswordChange: new Date(),
        },
      });
    }

    if (
      decodedToken.lastPasswordChange !==
      user.lastPasswordChange?.getTime().toString()
    ) {
      return {
        __typename: 'InvalidOrExpiredToken',
        message:
          'The token/link to reset your password is invalid, request another password reset if you wish to change your password',
      };
    }

    // Outsource this into its own helper function for reusability here and above
    await reach(createUserSchema, 'password').validate(data.newPassword);
    const validCurrentPassword = await compare(
      data.currentPassword,
      user.password
    );

    if (!validCurrentPassword) {
      return {
        __typename: 'PasswordsDontMatch',
        message: 'Your current password does not match the one you provided',
      };
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: await hash(data.newPassword, 12),
      },
    });

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        lastPasswordChange: new Date(),
      },
    });

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
      lastPasswordChange: updatedUser.lastPasswordChange?.getTime().toString(),
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
