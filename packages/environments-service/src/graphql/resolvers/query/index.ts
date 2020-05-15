import getEnvironments from './getEnvironments';
import { ApolloContext } from '../../../typings';
import { Environment } from '@prisma/client';

export interface QueryOperations {
  getEnvironments(
    root: any,
    args: {},
    ctx: ApolloContext
  ): Promise<Environment[]>;
}

const QueryResolvers: QueryOperations = {
  getEnvironments,
};

export default QueryResolvers;
