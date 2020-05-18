import { QueryOperations } from '.';
import { ApolloError } from 'apollo-server-express';
import { User } from '../../generated';
import { createUserSchema } from '../../../validation/createUser';
import { reach } from 'yup';

const user: QueryOperations['user'] = async (_, args, { prisma }) => {
  try {
    let consumableUsername;

    if (args.username) {
      consumableUsername = args.username;

      if (args.username.startsWith('@')) {
        const [, ...withoutAtUsername] = args.username;
        consumableUsername = withoutAtUsername.join('');
      }

      await reach(createUserSchema, 'username').validate(consumableUsername);
    }

    if (args.email) {
      await reach(createUserSchema, 'email').validate(args.email);
    }

    const filter = {
      ...args,
      ...(consumableUsername && { username: consumableUsername }),
    };

    const user = await prisma.user.findOne({ where: { ...filter } });

    if (!user) {
      return {
        __typename: 'UserNotFound',
        message: "Couldn't find an user which matches the provided filter",
      };
    }

    return {
      __typename: 'User',
      email: user.email,
      id: user.id,
      name: user.name,
      username: user.username,
      provider: user.provider,
      password: user.password,
      role: user.role,
      lastPasswordChange: user.lastPasswordChange,
      picture: user.picture,
    } as User;
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

export default user;
