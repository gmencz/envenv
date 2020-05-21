import requestPasswordResetEmail from './requestPasswordResetEmail';
import {
  QueryRequestPasswordResetEmailArgs,
  QueryUserArgs,
  UserResult,
  RequestPasswordResetEmailResult,
} from '../../generated';
import { ApolloContext } from '../../../typings';
import { QueryResolvers } from '../../generated';
import user from './user';

export interface QueryOperations {
  requestPasswordResetEmail(
    root: any,
    args: QueryRequestPasswordResetEmailArgs,
    ctx: ApolloContext
  ): Promise<RequestPasswordResetEmailResult>;
  user(root: any, args: QueryUserArgs, ctx: ApolloContext): Promise<UserResult>;
}

const QueryResolvers: {
  [T in keyof QueryResolvers]: QueryOperations[keyof QueryOperations];
} = {
  requestPasswordResetEmail,
  user,
};

export default QueryResolvers;
