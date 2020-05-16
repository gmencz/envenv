import getEnvironments from './getEnvironments';
import { ApolloContext } from '../../../typings';
import { Environment } from '@prisma/client';
import { QueryResolvers } from '../../generated';

export interface QueryOperations {
  getEnvironments(
    root: any,
    args: {},
    ctx: ApolloContext
  ): Promise<Environment[]>;
}

const QueryResolvers: {
  [T in keyof QueryResolvers]: QueryOperations[keyof QueryOperations];
} = {
  getEnvironments,
};

export default QueryResolvers;
