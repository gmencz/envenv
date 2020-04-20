import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import User from '../entities/User';
import UserInput from '../graphqlShared/inputs/UserInput';
import { ApolloError } from 'apollo-server';
import { newUserValidation } from '../entities/User/validation';
import { hash } from 'bcryptjs';

@Resolver(() => User)
export default class UsersResolver {
  @Query(() => [User])
  async getUsers(): Promise<User[]> {
    const users = await User.find();

    return users;
  }

  @Mutation(() => User)
  async signup(@Arg('newUserData') newUserData: UserInput): Promise<User> {
    try {
      await newUserValidation.validate({ ...newUserData });

      const usernameAlreadyExists = await User.findOne({
        where: { username: newUserData.username },
      });

      if (usernameAlreadyExists) {
        throw new ApolloError('That username is taken!', '400');
      }

      const emailAlreadyExists = await User.findOne({
        where: { email: newUserData.email },
      });

      if (emailAlreadyExists) {
        throw new ApolloError(
          'That email already belongs to someone else!',
          '400'
        );
      }

      const password = await hash(newUserData.password, 12);

      const user = await new User({ ...newUserData, password }).save();

      return user;
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
