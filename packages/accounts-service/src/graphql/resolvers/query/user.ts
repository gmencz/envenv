import { ApolloError } from 'apollo-server-express';
import {
  QueryResolvers,
  UserResult,
  AccountProvider,
  UserRole,
} from '../../generated';
import { createUserSchema } from '../../../validation/createUser';
import { reach } from 'yup';
import { getCachedUser, cacheUser } from '../../../helpers/cache/user';

const user: QueryResolvers['user'] = async (
  _,
  args,
  { prisma }
): Promise<UserResult> => {
  try {
    if (args.username) {
      await reach(createUserSchema, 'username').validate(args.username);
    }

    if (args.email) {
      await reach(createUserSchema, 'email').validate(args.email);
    }

    if (args.id) {
      const cachedUser = await getCachedUser(args.id);

      if (cachedUser) {
        return {
          __typename: 'User',
          email: cachedUser.email,
          id: cachedUser.id,
          name: cachedUser.name,
          username: cachedUser.username,
          provider: cachedUser.provider as AccountProvider,
          password: cachedUser.password,
          role: cachedUser.role as UserRole,
          lastPasswordChange: cachedUser.lastPasswordChange,
          picture: cachedUser.picture,
        };
      }
    }
    console.log('hey');
    const user = await prisma.user.findOne({
      where: {
        ...args,
        ...(args.username && {
          username: args.username.startsWith('@')
            ? args.username
            : `@${args.username}`,
        }),
      },
    });

    if (!user) {
      return {
        __typename: 'UserNotFound',
        message: "Couldn't find an user which matches the provided filter",
      };
    }

    await cacheUser(user);

    return {
      __typename: 'User',
      email: user.email,
      id: user.id,
      name: user.name,
      username: user.username,
      provider: user.provider as AccountProvider,
      password: user.password,
      role: user.role as UserRole,
      lastPasswordChange: user.lastPasswordChange,
      picture: user.picture,
    };
  } catch (error) {
    console.log(error);
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

export default user;
