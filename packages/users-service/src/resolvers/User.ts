import { Resolver, Query, Mutation, Arg, Ctx } from 'type-graphql';
import User from '../entities/User';
import UserInput from '../graphqlShared/inputs/UserInput';
import { ApolloError } from 'apollo-server';
import { newUserValidation } from '../entities/User/validation';
import { hash } from 'bcryptjs';
import { v4 } from 'uuid';
import { ApolloContext } from '../graphqlShared/interfaces';
import AuthResponse from '../graphqlShared/types/AuthResponse';
import ExternalProviderInput from '../graphqlShared/inputs/ExternalProviderInput';
import { generate } from 'generate-password';

@Resolver(() => User)
export default class UsersResolver {
  @Query(() => [User])
  async getUsers(): Promise<User[]> {
    const users = await User.find();

    return users;
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
          '400'
        );
      }

      return true;
    } catch (error) {
      if (error instanceof ApolloError) {
        throw error;
      }

      throw new ApolloError(
        `Something went wrong on our side, we're working on it!`,
        '500'
      );
    }
  }

  @Mutation(() => Boolean)
  async signupWithExternalProvider(
    @Arg('newUserData') newUserData: ExternalProviderInput,
    @Ctx() { req }: ApolloContext
  ): Promise<boolean> {
    const cookies = JSON.parse(req.headers.cookies as string);
    const password = generate({ length: 19, symbols: true, numbers: true });

    const userData = {
      ...newUserData,
      ...cookies.NewUserData,
      password: await hash(password, 12),
    };

    console.log(userData);
    return true;
  }

  @Mutation(() => AuthResponse)
  async signup(
    @Arg('newUserData') newUserData: UserInput
  ): Promise<AuthResponse> {
    try {
      await newUserValidation.validate({ ...newUserData });

      // if (newUserData.provider !== 'none') {
      //   const accountAlreadyExists = await User.findOne({
      //     where: { id: newUserData.id },
      //   });

      //   if (accountAlreadyExists) {
      //     throw new ApolloError(
      //       `That ${newUserData.provider} account is already registered with us!`,
      //       '400'
      //     );
      //   }
      // }

      const usernameAlreadyExists = await User.findOne({
        where: { username: newUserData.username },
      });

      if (usernameAlreadyExists) {
        throw new ApolloError('That username is taken!', '400');
      }

      const password = await hash(newUserData.password, 12);

      const user = await new User({
        ...newUserData,
        password,
        id: newUserData.id || v4(),
      }).save();

      return { user, accessToken: 'create access token here' };
    } catch (error) {
      if (error.name === 'ValidationError') {
        throw new ApolloError(error.message, '400');
      }

      if (error instanceof ApolloError) {
        throw error;
      }

      throw new ApolloError(
        `Something went wrong on our side, we're working on it!`,
        '500'
      );
    }
  }
}
