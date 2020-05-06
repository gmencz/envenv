import { Resolver, Query, Mutation, Arg, Ctx } from 'type-graphql';
import User from '../entities/User';
import UserInput from '../graphqlShared/inputs/UserInput';
import { ApolloError } from 'apollo-server';
import { newUserValidation } from '../entities/User/validation';
import { hash } from 'bcryptjs';
import { ApolloContext } from '../graphqlShared/interfaces';
import AuthResponse from '../graphqlShared/types/AuthResponse';
import ExternalProviderInput from '../graphqlShared/inputs/ExternalProviderInput';
import { generate } from 'generate-password';
import { request } from 'graphql-request';
import { generate as generateUniqueId } from 'shortid';
import { Response } from 'express';
import { QueryUserBy } from '../graphqlShared/enums/UserBy';

@Resolver(() => User)
export default class UsersResolver {
  @Query(() => User)
  async queryUser(
    @Arg('by', () => QueryUserBy) by: QueryUserBy,
    @Arg('byValue') byValue: string
  ): Promise<User> {
    try {
      const byPossibilities = ['id', 'username'];

      const validBy = byPossibilities.find(
        byPossibility => byPossibility === by
      );

      if (!validBy) {
        throw new ApolloError(
          `Cannot query user by ${by}, available query fields are: ${byPossibilities.join(
            ', '
          )}`,
          '400',
          {
            errorCode: 'invalid_by_parameter',
          }
        );
      }

      const user = await User.findOne({ where: { [by]: byValue } });

      if (!user) {
        throw new ApolloError(
          `Could not find an user with ${by} ${byValue}`,
          '404',
          {
            errorCode: 'user_not_found',
          }
        );
      }

      return user;
    } catch (error) {
      if (error instanceof ApolloError) {
        throw error;
      }

      throw new ApolloError(
        `Something went wrong on our side, we're working on it!`,
        '500',
        {
          errorCode: 'server_error',
        }
      );
    }
  }

  @Query(() => Boolean)
  async checkExternalProviderUserAvailability(
    @Arg('providerUserId') providerUserId: string
  ): Promise<boolean> {
    try {
      const isUnavailable = await User.findOne({
        where: { id: providerUserId },
      });

      if (isUnavailable) {
        throw new ApolloError(
          'Your google account is already registered with us!',
          '400',
          {
            errorCode: 'already_registered',
          }
        );
      }

      return true;
    } catch (error) {
      if (error instanceof ApolloError) {
        throw error;
      }

      throw new ApolloError(
        `Something went wrong on our side, we're working on it!`,
        '500',
        {
          errorCode: 'server_error',
        }
      );
    }
  }

  @Mutation(() => AuthResponse)
  async signupWithExternalProvider(
    @Arg('newUserData') newUserData: ExternalProviderInput,
    @Ctx() { req, res }: ApolloContext
  ): Promise<AuthResponse> {
    try {
      const cookies = JSON.parse(req.headers.cookie as string);

      if (!cookies.NewUserData) {
        throw new ApolloError(
          'Your time to sign up has expired, please proceed to sign up with your provider of choice (google/facebook)',
          '400',
          {
            errorCode: 'expired_signup',
          }
        );
      }

      const password = generate({ length: 19, symbols: true, numbers: true });

      const userData = {
        ...newUserData,
        ...cookies.NewUserData,
        password: await hash(password, 12),
      };

      await newUserValidation.validate({ ...userData });

      const userExists = await User.findOne({ where: { id: userData.id } });

      if (userExists) {
        throw new ApolloError(
          `That ${userData.provider} account is already registered with us!`,
          '400',
          {
            errorCode: 'already_registered',
          }
        );
      }

      const usernameUnavailable = await User.findOne({
        where: { username: newUserData.username },
      });

      if (usernameUnavailable) {
        throw new ApolloError(
          `That username is taken, please choose a different one!`,
          '400',
          {
            errorCode: 'username_taken',
          }
        );
      }

      const user = await new User({ ...userData }).save();

      const sessionQuery = `
        mutation createSession($userId: String!) {
          createSession(userId: $userId) {
            sessionId
            csrfToken
          }
        }
      `;

      const data = await request(
        'http://auth-service:5000/graphql',
        sessionQuery,
        { userId: user.id }
      );

      res.cookie('SID', data.createSession.sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: Number(process.env.SESSION_COOKIE_EXPIRY as string),
      });

      res.clearCookie('NewUserData');

      return { user, csrfToken: data.createSession.csrfToken };
    } catch (error) {
      console.log(error);
      if (error.name === 'ValidationError') {
        throw new ApolloError(error.message, '400', {
          errorCode: 'validation_error',
        });
      }

      if (error instanceof ApolloError) {
        throw error;
      }

      throw new ApolloError(
        `Something went wrong on our side, we're working on it!`,
        '500',
        {
          errorCode: 'server_error',
        }
      );
    }
  }

  @Mutation(() => AuthResponse)
  async signup(
    @Arg('newUserData') newUserData: UserInput,
    @Ctx() { res }: { res: Response }
  ): Promise<AuthResponse> {
    try {
      await newUserValidation.validate({ ...newUserData });

      const usernameAlreadyExists = await User.findOne({
        where: { username: newUserData.username },
      });

      if (usernameAlreadyExists) {
        throw new ApolloError(
          'That username is taken, please choose a different one!',
          '400',
          {
            errorCode: 'username_taken',
          }
        );
      }

      const password = await hash(newUserData.password, 12);

      const user = await new User({
        ...newUserData,
        password,
        id: newUserData.id || `${generateUniqueId()}${generateUniqueId()}`,
      }).save();

      const sessionQuery = `
        mutation createSession($userId: String!) {
          createSession(userId: $userId) {
            sessionId
            csrfToken
          }
        }
      `;

      const data = await request(
        'http://auth-service:5000/graphql',
        sessionQuery,
        { userId: user.id }
      );

      res.cookie('SID', data.createSession.sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: Number(process.env.SESSION_COOKIE_EXPIRY as string),
      });

      return { user, csrfToken: data.createSession.csrfToken };
    } catch (error) {
      if (error.name === 'ValidationError') {
        throw new ApolloError(error.message, '400', {
          errorCode: 'validation_error',
        });
      }

      if (error instanceof ApolloError) {
        throw error;
      }

      throw new ApolloError(
        `Something went wrong on our side, we're working on it!`,
        '500',
        {
          errorCode: 'server_error',
        }
      );
    }
  }
}
