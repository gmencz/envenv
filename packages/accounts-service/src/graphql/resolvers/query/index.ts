import requestPasswordResetEmail from './requestPasswordResetEmail';
import {
  QueryRequestPasswordResetEmailArgs,
  QueryCheckExternalProviderUserAvailabilityArgs,
} from '../../generated';
import { ApolloContext } from '../../../typings';
import { QueryResolvers } from '../../generated';
import checkExternalProviderUserAvailability from './checkExternalProviderUserAvailability';

export interface QueryOperations {
  requestPasswordResetEmail(
    root: any,
    args: QueryRequestPasswordResetEmailArgs,
    ctx: ApolloContext
  ): Promise<boolean>;
  checkExternalProviderUserAvailability(
    root: any,
    args: QueryCheckExternalProviderUserAvailabilityArgs,
    ctx: ApolloContext
  ): Promise<boolean>;
}

const QueryResolvers: {
  [T in keyof QueryResolvers]: QueryOperations[keyof QueryOperations];
} = {
  requestPasswordResetEmail,
  checkExternalProviderUserAvailability,
};

export default QueryResolvers;
