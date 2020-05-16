import requestPasswordResetEmail from './requestPasswordResetEmail';
import { QueryRequestPasswordResetEmailArgs } from '../../generated';
import { ApolloContext } from '../../../typings';

export interface QueryOperations {
  requestPasswordResetEmail(
    root: any,
    args: QueryRequestPasswordResetEmailArgs,
    ctx: ApolloContext
  ): Promise<boolean>;
}

const QueryResolvers: QueryOperations = {
  requestPasswordResetEmail,
};

export default QueryResolvers;
