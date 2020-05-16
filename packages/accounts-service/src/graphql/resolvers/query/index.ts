import requestPasswordResetEmail from './requestPasswordResetEmail';
import {
  QueryRequestPasswordResetEmailArgs,
  QueryFindUserArgs,
} from '../../generated';
import { ApolloContext } from '../../../typings';
import { QueryResolvers } from '../../generated';
import { User } from '@prisma/client';
import findUser from './findUser';

export interface QueryOperations {
  requestPasswordResetEmail(
    root: any,
    args: QueryRequestPasswordResetEmailArgs,
    ctx: ApolloContext
  ): Promise<boolean>;
  findUser(
    root: any,
    args: QueryFindUserArgs,
    ctx: ApolloContext
  ): Promise<User | null>;
}

const QueryResolvers: {
  [T in keyof QueryResolvers]: QueryOperations[keyof QueryOperations];
} = {
  requestPasswordResetEmail,
  findUser,
};

export default QueryResolvers;
