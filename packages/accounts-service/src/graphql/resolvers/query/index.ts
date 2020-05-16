import requestPasswordResetEmail from './requestPasswordResetEmail';
import { QueryRequestPasswordResetEmailArgs } from '../../generated';
import { ApolloContext } from '../../../typings';
import { QueryResolvers } from '../../generated';

export interface QueryOperations {
  requestPasswordResetEmail(
    root: any,
    args: QueryRequestPasswordResetEmailArgs,
    ctx: ApolloContext
  ): Promise<boolean>;
}

const QueryResolvers: {
  [T in keyof QueryResolvers]: QueryOperations[keyof QueryOperations];
} = {
  requestPasswordResetEmail,
};

export default QueryResolvers;
