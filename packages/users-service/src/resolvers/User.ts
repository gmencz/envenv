import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import User from '../entities/User';
import UserInput from '../graphqlShared/inputs/UserInput';
import { ApolloError } from 'apollo-server';
import { newUserValidation } from '../entities/User/validation';
import { hash } from 'bcryptjs';
import { generate as generateUniqueId } from 'shortid';
import { QueryUserBy } from '../graphqlShared/enums/UserBy';

@Resolver(() => User)
export default class UsersResolver {
  @Query(() => User, { nullable: true })
  async queryUser(
    @Arg('by', () => QueryUserBy) by: QueryUserBy,
    @Arg('byValue') byValue: string
  ): Promise<User | null> {
    try {
      const byPossibilities = ['id', 'username', 'email'];

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
            errorCode: 'invalid_by',
          }
        );
      }

      const user = await User.findOne({ where: { [by]: byValue } });

      if (!user) {
        return null;
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

  @Mutation(() => User)
  async createUser(@Arg('newUserData') newUserData: UserInput): Promise<User> {
    try {
      await newUserValidation.validate({ ...newUserData });

      const password = await hash(newUserData.password, 12);

      const user = await new User({
        ...newUserData,
        password,
        id: newUserData.id || `${generateUniqueId()}${generateUniqueId()}`,
      }).save();

      return user;
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

  @Mutation(() => Boolean)
  async deleteAllUsers(): Promise<boolean> {
    // Only available for testing purposes
    if (process.env.NODE_ENV !== 'test') {
      throw new ApolloError(
        'Cannot delete, this operation is only available in a testing environment',
        '403',
        {
          errorCode: 'forbidden',
        }
      );
    }

    await User.clear();
    return true;
  }
}
